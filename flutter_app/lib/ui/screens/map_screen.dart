import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:webview_flutter/webview_flutter.dart';
import '../../core/constants/app_constants.dart';
import '../../core/theme/app_theme.dart';
import '../widgets/sol_clock_widget.dart';

class MapScreen extends StatefulWidget {
  const MapScreen({super.key});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  late final WebViewController _controller;
  bool _isLoading = true;
  String _currentView = 'orbit';

  @override
  void initState() {
    super.initState();
    _controller = WebViewController();

    if (!kIsWeb) {
      _controller
        ..setJavaScriptMode(JavaScriptMode.unrestricted)
        ..setBackgroundColor(AppTheme.background)
        ..setNavigationDelegate(
          NavigationDelegate(
            onPageStarted: (String url) {
              if (mounted) setState(() => _isLoading = true);
            },
            onPageFinished: (String url) {
              if (mounted) setState(() => _isLoading = false);
            },
            onWebResourceError: (WebResourceError error) {
              debugPrint('WebView Error: ${error.description}');
            },
          ),
        )
        ..addJavaScriptChannel(
          'AeroAtlasFlutter',
          onMessageReceived: (JavaScriptMessage message) {
            if (mounted) {
              setState(() {
                _currentView = message.message;
              });
            }
          },
        );
    } else {
      // On web browsers, iframe handles JavaScript and loading directly
      _isLoading = false;
    }

    _controller.loadRequest(Uri.parse(AppConstants.webAppUrl));
  }

  void _sendScript(String script) {
    if (!kIsWeb) {
      _controller.runJavaScript(script);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // 3D WebGL Canvas
          WebViewWidget(controller: _controller),

          // Loading Overlay
          if (_isLoading)
            Container(
              color: AppTheme.background,
              child: Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const CircularProgressIndicator(color: AppTheme.marsOrange),
                    const SizedBox(height: 20),
                    Text(
                      'LOADING 3D MARTIAN ATLAS...',
                      style: GoogleFonts.orbitron(
                        color: AppTheme.textPrimary,
                        fontSize: 14,
                        letterSpacing: 1.5,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'NASA MRO & THEMIS elevation data',
                      style: GoogleFonts.rajdhani(
                        color: AppTheme.textMuted,
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ),
            ),

          // Top Floating Sol Clock HUD
          const Positioned(
            top: 48,
            left: 16,
            right: 16,
            child: SolClockWidget(),
          ),

          // Bottom Floating Native Control Bar
          Positioned(
            bottom: 24,
            left: 16,
            right: 16,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: BoxDecoration(
                color: AppTheme.surface.withValues(alpha: 0.88),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppTheme.border),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.5),
                    blurRadius: 16,
                    offset: const Offset(0, 8),
                  ),
                ],
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildQuickButton(
                    icon: Icons.public,
                    label: 'Orbit',
                    isActive: _currentView == 'orbit',
                    onTap: () {
                      _sendScript('window.solAtlas && window.solAtlas.resetOrbit && window.solAtlas.resetOrbit();');
                    },
                  ),
                  _buildQuickButton(
                    icon: Icons.terrain,
                    label: 'Crater',
                    isActive: _currentView == 'crater',
                    onTap: () {
                      _sendScript('window.solAtlas && window.solAtlas.descendToJezero && window.solAtlas.descendToJezero();');
                    },
                  ),
                  _buildQuickButton(
                    icon: Icons.directions_walk,
                    label: 'Marswalk',
                    isActive: _currentView == 'site',
                    onTap: () {
                      _sendScript('window.solAtlas && window.solAtlas.enterSite && window.solAtlas.enterSite();');
                    },
                  ),
                  _buildQuickButton(
                    icon: Icons.refresh,
                    label: 'Reload',
                    isActive: false,
                    onTap: () {
                      _controller.loadRequest(Uri.parse(AppConstants.webAppUrl));
                    },
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickButton({
    required IconData icon,
    required String label,
    required bool isActive,
    required VoidCallback onTap,
  }) {
    final color = isActive ? AppTheme.marsOrange : AppTheme.textSecondary;
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(10),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: color, size: 22),
            const SizedBox(height: 4),
            Text(
              label,
              style: GoogleFonts.rajdhani(
                color: color,
                fontSize: 12,
                fontWeight: isActive ? FontWeight.bold : FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
