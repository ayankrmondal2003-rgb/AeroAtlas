import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../core/theme/app_theme.dart';

class EvaPlannerScreen extends StatefulWidget {
  const EvaPlannerScreen({super.key});

  @override
  State<EvaPlannerScreen> createState() => _EvaPlannerScreenState();
}

class _EvaPlannerScreenState extends State<EvaPlannerScreen> {
  double _distanceKm = 4.5;
  double _walkingSpeedKmH = 3.5;
  double _slopeGrade = 5.0; // degrees
  double _oxygenCapacityHours = 8.0;

  // Metabolic calculations
  // Walking on Mars (0.38g) with ~120kg suit + astronaut
  double get totalDurationHours {
    // Slopes above 10 deg slow down walking speed by up to 40%
    final slopePenalty = 1.0 + (_slopeGrade / 25.0);
    final effectiveSpeed = _walkingSpeedKmH / slopePenalty;
    return (_distanceKm * 2) / effectiveSpeed; // Round trip
  }

  double get oxygenRequiredHours {
    // Metabolic factor: steeper climbs consume more O2
    final climbWorkFactor = 1.0 + (_slopeGrade * 0.04);
    return totalDurationHours * climbWorkFactor;
  }

  double get oxygenRemainingHours => _oxygenCapacityHours - oxygenRequiredHours;

  double get pointOfNoReturnKm {
    final maxHalfHours = _oxygenCapacityHours / 2.0;
    final slopePenalty = 1.0 + (_slopeGrade / 25.0);
    return (maxHalfHours * (_walkingSpeedKmH / slopePenalty));
  }

  int get caloriesBurned {
    // ~350 kcal/hour base in EVA suit + slope effort
    return (totalDurationHours * 380 * (1.0 + _slopeGrade * 0.03)).round();
  }

  @override
  Widget build(BuildContext context) {
    final bool isOxygenDepleted = oxygenRemainingHours < 0;
    final bool isLowReserve = oxygenRemainingHours >= 0 && oxygenRemainingHours < 1.5;

    final Color statusColor = isOxygenDepleted
        ? AppTheme.hazardRed
        : isLowReserve
            ? AppTheme.marsAmber
            : AppTheme.safeGreen;

    final String statusText = isOxygenDepleted
        ? 'OXYGEN RUNS DRY IN TRANSIT'
        : isLowReserve
            ? 'CRITICAL RESERVE MARGIN'
            : 'SAFE EVA RETURN MARGIN';

    return Scaffold(
      appBar: AppBar(
        title: const Text('EVA SURVIVAL PLANNER'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Safety Banner
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: statusColor.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: statusColor, width: 1.5),
            ),
            child: Row(
              children: [
                Icon(
                  isOxygenDepleted ? Icons.error_outline : Icons.check_circle_outline,
                  color: statusColor,
                  size: 28,
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        statusText,
                        style: GoogleFonts.orbitron(
                          color: statusColor,
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Round trip distance: ${(_distanceKm * 2).toStringAsFixed(1)} km | Time: ${totalDurationHours.toStringAsFixed(1)} h',
                        style: GoogleFonts.jetBrainsMono(
                          color: AppTheme.textPrimary,
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 20),

          // Computed Telemetry Row
          Row(
            children: [
              Expanded(
                child: _buildResultCard(
                  'O₂ RESERVE',
                  '${oxygenRemainingHours.toStringAsFixed(1)} h',
                  oxygenRemainingHours < 0 ? 'Deficit' : 'Spare capacity',
                  statusColor,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildResultCard(
                  'NO-RETURN POINT',
                  '${pointOfNoReturnKm.toStringAsFixed(1)} km',
                  'Turnaround limit',
                  AppTheme.cyanAccent,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildResultCard(
                  'ENERGY BURN',
                  '$caloriesBurned',
                  'kcal expended',
                  AppTheme.marsAmber,
                ),
              ),
            ],
          ),

          const SizedBox(height: 24),

          // Parameter Sliders
          _buildSliderGroup(
            label: 'One-Way Traverse Distance',
            valueText: '${_distanceKm.toStringAsFixed(1)} km',
            value: _distanceKm,
            min: 0.5,
            max: 12.0,
            onChanged: (val) => setState(() => _distanceKm = val),
          ),

          const SizedBox(height: 16),

          _buildSliderGroup(
            label: 'Astronaut Walking Pace (Suit)',
            valueText: '${_walkingSpeedKmH.toStringAsFixed(1)} km/h',
            value: _walkingSpeedKmH,
            min: 1.5,
            max: 5.5,
            onChanged: (val) => setState(() => _walkingSpeedKmH = val),
          ),

          const SizedBox(height: 16),

          _buildSliderGroup(
            label: 'Average Terrain Slope (HiRISE DTM)',
            valueText: '${_slopeGrade.toStringAsFixed(0)}° incline',
            value: _slopeGrade,
            min: 0.0,
            max: 30.0,
            onChanged: (val) => setState(() => _slopeGrade = val),
          ),

          const SizedBox(height: 16),

          _buildSliderGroup(
            label: 'Suit Primary O₂ Bottle Duration',
            valueText: '${_oxygenCapacityHours.toStringAsFixed(0)} hours',
            value: _oxygenCapacityHours,
            min: 4.0,
            max: 12.0,
            onChanged: (val) => setState(() => _oxygenCapacityHours = val),
          ),

          const SizedBox(height: 24),

          // NASA Rule of Thumb Card
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppTheme.surface,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: AppTheme.border),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'NASA APOLLO / ARTEMIS EVA PROTOCOL',
                  style: GoogleFonts.orbitron(
                    color: AppTheme.marsOrange,
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  'Astronauts must never plan traverses exceeding 65% of total suit life support consumables. The remaining 35% is strictly reserved for terrain contingencies, suit punctures, and rover assist towing.',
                  style: GoogleFonts.rajdhani(
                    color: AppTheme.textSecondary,
                    fontSize: 13,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildResultCard(String label, String value, String sub, Color color) {
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
          Text(label, style: GoogleFonts.jetBrainsMono(color: AppTheme.textMuted, fontSize: 10)),
          const SizedBox(height: 4),
          Text(value, style: GoogleFonts.orbitron(color: color, fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 2),
          Text(sub, style: GoogleFonts.rajdhani(color: AppTheme.textSecondary, fontSize: 11)),
        ],
      ),
    );
  }

  Widget _buildSliderGroup({
    required String label,
    required String valueText,
    required double value,
    required double min,
    required double max,
    required ValueChanged<double> onChanged,
  }) {
    return Container(
      padding: const EdgeInsets.all(14),
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
              Text(label, style: GoogleFonts.rajdhani(color: AppTheme.textPrimary, fontSize: 14, fontWeight: FontWeight.w600)),
              Text(valueText, style: GoogleFonts.jetBrainsMono(color: AppTheme.cyanAccent, fontSize: 13, fontWeight: FontWeight.bold)),
            ],
          ),
          Slider(
            value: value,
            min: min,
            max: max,
            activeColor: AppTheme.marsOrange,
            inactiveColor: AppTheme.surfaceLight,
            onChanged: onChanged,
          ),
        ],
      ),
    );
  }
}
