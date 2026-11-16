import 'package:flutter/material.dart';
import 'core/theme/app_theme.dart';
import 'ui/screens/main_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const AeroAtlasApp());
}

class AeroAtlasApp extends StatelessWidget {
  const AeroAtlasApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AeroAtlas',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      home: const MainScreen(),
    );
  }
}
