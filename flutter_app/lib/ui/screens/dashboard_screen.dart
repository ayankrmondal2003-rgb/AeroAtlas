import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../core/theme/app_theme.dart';
import '../../data/models/space_weather_model.dart';
import '../../data/services/space_weather_service.dart';
import '../widgets/sol_clock_widget.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final SpaceWeatherService _spaceWeatherService = SpaceWeatherService();
  late Future<List<SpaceWeatherAlert>> _alertsFuture;

  @override
  void initState() {
    super.initState();
    _alertsFuture = _spaceWeatherService.fetchMarsAlerts();
  }

  void _refresh() {
    setState(() {
      _alertsFuture = _spaceWeatherService.fetchMarsAlerts();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('MISSION CONTROL'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh, color: AppTheme.marsOrange),
            onPressed: _refresh,
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const SolClockWidget(),
          const SizedBox(height: 20),

          // Live Space Weather Card
          _buildSectionHeader('SPACE WEATHER (NASA DONKI)'),
          const SizedBox(height: 10),
          FutureBuilder<List<SpaceWeatherAlert>>(
            future: _alertsFuture,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Card(
                  child: Padding(
                    padding: EdgeInsets.all(24),
                    child: Center(
                      child: CircularProgressIndicator(color: AppTheme.marsOrange),
                    ),
                  ),
                );
              }

              final alerts = snapshot.data ?? [];
              final arrivingAlerts = alerts.where((a) => a.isArrivingSoon).toList();

              if (arrivingAlerts.isEmpty) {
                return _buildStatusCard(
                  icon: Icons.shield_outlined,
                  color: AppTheme.safeGreen,
                  title: 'SOLAR RADIATION QUIET',
                  subtitle: 'No coronal mass ejections (CMEs) forecast to impact Mars in the next 72 hours.',
                  extra: 'NASA WSA-ENLIL solar wind simulations verified.',
                );
              }

              return Column(
                children: arrivingAlerts.map((alert) {
                  return Card(
                    color: AppTheme.surface,
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const Icon(Icons.warning_amber_rounded, color: AppTheme.hazardRed, size: 24),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  'CME IMPACT ALERT: ${alert.arrivalSummary.toUpperCase()}',
                                  style: GoogleFonts.orbitron(
                                    color: AppTheme.hazardRed,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 14,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Model Completion: ${alert.launched.toIso8601String().substring(0, 16)} UTC\n'
                            'Impact Speed: ${alert.speed != null ? "${alert.speed!.round()} km/s" : "Normal"}\n'
                            'Trajectory: ${alert.isGlancing ? "Glancing blow" : "Direct impact"}',
                            style: GoogleFonts.jetBrainsMono(
                              color: AppTheme.textSecondary,
                              fontSize: 12,
                              height: 1.5,
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              );
            },
          ),

          const SizedBox(height: 24),

          // Perseverance Rover Telemetry
          _buildSectionHeader('SURFACE TELEMETRY (JEZERO CRATER)'),
          const SizedBox(height: 10),
          _buildTelemetryGrid(),

          const SizedBox(height: 24),

          // Exploration Sites
          _buildSectionHeader('PRIMARY RECONNAISSANCE SITES'),
          const SizedBox(height: 10),
          _buildSiteCard(
            'Kodiak Butte',
            'Isolated sedimentary delta remnant proving ancient lake existence. Max height ~250m above floor.',
            'Delta Remnant',
          ),
          const SizedBox(height: 8),
          _buildSiteCard(
            'Three Forks Delta Scarp',
            'Layered clays and carbonates containing rich biosignature preservation zones.',
            'Target Science Zone',
          ),
          const SizedBox(height: 8),
          _buildSiteCard(
            'Séítah Dunes',
            'Undulating olivine-rich sand dunes with high wheel-slip hazard. Avoid EVA traverses.',
            'Hazard Zone',
          ),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Text(
      title,
      style: GoogleFonts.orbitron(
        color: AppTheme.marsOrange,
        fontSize: 13,
        fontWeight: FontWeight.bold,
        letterSpacing: 1.2,
      ),
    );
  }

  Widget _buildStatusCard({
    required IconData icon,
    required Color color,
    required String title,
    required String subtitle,
    required String extra,
  }) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: color, size: 24),
                const SizedBox(width: 8),
                Text(
                  title,
                  style: GoogleFonts.orbitron(
                    color: color,
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(subtitle, style: GoogleFonts.rajdhani(color: AppTheme.textPrimary, fontSize: 14)),
            const SizedBox(height: 4),
            Text(extra, style: GoogleFonts.jetBrainsMono(color: AppTheme.textMuted, fontSize: 11)),
          ],
        ),
      ),
    );
  }

  Widget _buildTelemetryGrid() {
    return GridView.count(
      crossAxisCount: 2,
      crossAxisSpacing: 10,
      mainAxisSpacing: 10,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      childAspectRatio: 1.8,
      children: [
        _buildMetricTile('ATM. PRESSURE', '710 Pa', '0.007 bar', AppTheme.cyanAccent),
        _buildMetricTile('SURFACE TEMP', '-42 °C', 'Min: -84° / Max: -18°', AppTheme.marsAmber),
        _buildMetricTile('GRAVITY', '3.72 m/s²', '0.38 g of Earth', AppTheme.textPrimary),
        _buildMetricTile('DUST OPACITY (TAU)', '0.52', 'Clear skies', AppTheme.safeGreen),
      ],
    );
  }

  Widget _buildMetricTile(String label, String value, String sub, Color color) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: AppTheme.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(label, style: GoogleFonts.jetBrainsMono(color: AppTheme.textMuted, fontSize: 10)),
          const SizedBox(height: 2),
          Text(value, style: GoogleFonts.orbitron(color: color, fontSize: 16, fontWeight: FontWeight.bold)),
          Text(sub, style: GoogleFonts.rajdhani(color: AppTheme.textSecondary, fontSize: 11)),
        ],
      ),
    );
  }

  Widget _buildSiteCard(String title, String desc, String badge) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.surface,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: AppTheme.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(title, style: GoogleFonts.orbitron(color: AppTheme.textPrimary, fontSize: 13, fontWeight: FontWeight.bold)),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: AppTheme.surfaceLight,
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(badge, style: GoogleFonts.jetBrainsMono(color: AppTheme.cyanAccent, fontSize: 10)),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Text(desc, style: GoogleFonts.rajdhani(color: AppTheme.textSecondary, fontSize: 13)),
        ],
      ),
    );
  }
}
