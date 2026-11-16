import 'dart:async';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../core/constants/app_constants.dart';
import '../../core/theme/app_theme.dart';

class SolClockWidget extends StatefulWidget {
  const SolClockWidget({super.key});

  @override
  State<SolClockWidget> createState() => _SolClockWidgetState();
}

class _SolClockWidgetState extends State<SolClockWidget> {
  late Timer _timer;
  late DateTime _now;

  @override
  void initState() {
    super.initState();
    _now = DateTime.now().toUtc();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted) {
        setState(() {
          _now = DateTime.now().toUtc();
        });
      }
    });
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  int get currentSol {
    final diffSec = _now.difference(AppConstants.landingDateUtc).inSeconds;
    return (diffSec / AppConstants.solSeconds).floor();
  }

  String get jezeroLmst {
    // Jezero crater is at ~77.58 degrees East.
    // 77.58 deg / 360 deg * 24 h = +5.172 hours offset.
    final diffSec = _now.difference(AppConstants.landingDateUtc).inMilliseconds / 1000.0;
    final fractionalSol = (diffSec / AppConstants.solSeconds);
    final dayFraction = (fractionalSol + (AppConstants.jezeroLon / 360.0)) % 1.0;
    
    final totalHours = dayFraction * 24.0;
    final hours = totalHours.floor();
    final totalMinutes = (totalHours - hours) * 60.0;
    final minutes = totalMinutes.floor();
    final seconds = ((totalMinutes - minutes) * 60.0).floor();

    return '${hours.toString().padLeft(2, '0')}:${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')} LMST';
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: AppTheme.surface.withValues(alpha: 0.9),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: AppTheme.border),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Container(
                width: 10,
                height: 10,
                decoration: const BoxDecoration(
                  color: AppTheme.marsOrange,
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: 10),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'SOL $currentSol',
                    style: GoogleFonts.orbitron(
                      color: AppTheme.marsOrange,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                      letterSpacing: 1.2,
                    ),
                  ),
                  Text(
                    'JEZERO CRATER',
                    style: GoogleFonts.jetBrainsMono(
                      color: AppTheme.textMuted,
                      fontSize: 10,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                jezeroLmst,
                style: GoogleFonts.jetBrainsMono(
                  color: AppTheme.cyanAccent,
                  fontWeight: FontWeight.w700,
                  fontSize: 14,
                ),
              ),
              Text(
                '${_now.hour.toString().padLeft(2, '0')}:${_now.minute.toString().padLeft(2, '0')}:${_now.second.toString().padLeft(2, '0')} UTC',
                style: GoogleFonts.jetBrainsMono(
                  color: AppTheme.textMuted,
                  fontSize: 10,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
