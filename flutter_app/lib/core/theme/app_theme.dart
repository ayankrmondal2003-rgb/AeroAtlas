import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Martian Palette
  static const Color background = Color(0xFF080B11);
  static const Color surface = Color(0xFF101724);
  static const Color surfaceLight = Color(0xFF1B2438);
  static const Color border = Color(0xFF26354D);

  static const Color marsOrange = Color(0xFFFF6B35);
  static const Color marsAmber = Color(0xFFFF9F1C);
  static const Color cyanAccent = Color(0xFF00F0FF);
  static const Color hazardRed = Color(0xFFFF3366);
  static const Color safeGreen = Color(0xFF00E676);

  static const Color textPrimary = Color(0xFFF0F4F8);
  static const Color textSecondary = Color(0xFF94A3B8);
  static const Color textMuted = Color(0xFF64748B);

  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: background,
      primaryColor: marsOrange,
      colorScheme: const ColorScheme.dark(
        primary: marsOrange,
        secondary: cyanAccent,
        surface: surface,
        error: hazardRed,
      ),
      cardTheme: CardThemeData(
        color: surface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          side: const BorderSide(color: border, width: 1),
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: background.withValues(alpha: 0.9),
        elevation: 0,
        centerTitle: false,
        titleTextStyle: GoogleFonts.orbitron(
          color: textPrimary,
          fontSize: 18,
          fontWeight: FontWeight.w700,
          letterSpacing: 1.5,
        ),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: surface,
        selectedItemColor: marsOrange,
        unselectedItemColor: textMuted,
        type: BottomNavigationBarType.fixed,
        elevation: 8,
      ),
      textTheme: TextTheme(
        headlineMedium: GoogleFonts.orbitron(
          color: textPrimary,
          fontSize: 22,
          fontWeight: FontWeight.bold,
          letterSpacing: 1.2,
        ),
        titleLarge: GoogleFonts.orbitron(
          color: textPrimary,
          fontSize: 16,
          fontWeight: FontWeight.w600,
          letterSpacing: 1.0,
        ),
        titleMedium: GoogleFonts.rajdhani(
          color: textPrimary,
          fontSize: 18,
          fontWeight: FontWeight.w600,
        ),
        bodyLarge: GoogleFonts.rajdhani(
          color: textPrimary,
          fontSize: 16,
          fontWeight: FontWeight.w500,
        ),
        bodyMedium: GoogleFonts.rajdhani(
          color: textSecondary,
          fontSize: 14,
        ),
        labelLarge: GoogleFonts.jetBrainsMono(
          color: textPrimary,
          fontSize: 13,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.5,
        ),
      ),
    );
  }
}
