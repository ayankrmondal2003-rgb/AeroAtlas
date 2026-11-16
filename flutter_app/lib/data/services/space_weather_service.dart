import 'dart:convert';
import 'package:http/http.dart' as http;
import '../../core/constants/app_constants.dart';
import '../models/space_weather_model.dart';

class SpaceWeatherService {
  final http.Client _client;

  SpaceWeatherService({http.Client? client}) : _client = client ?? http.Client();

  Future<List<SpaceWeatherAlert>> fetchMarsAlerts() async {
    final now = DateTime.now().toUtc();
    final start = now.subtract(const Duration(days: 30));

    final startDateStr = start.toIso8601String().substring(0, 10);
    final endDateStr = now.toIso8601String().substring(0, 10);

    final uri = Uri.parse(
      '${AppConstants.donkiUrl}?startDate=$startDateStr&endDate=$endDateStr&api_key=${AppConstants.demoApiKey}',
    );

    try {
      final response = await _client.get(uri).timeout(const Duration(seconds: 10));

      if (response.statusCode != 200) {
        throw Exception('NASA DONKI returned HTTP ${response.statusCode}');
      }

      final dynamic decoded = json.decode(response.body);
      if (decoded is! List) return [];

      final List<SpaceWeatherAlert> alerts = [];
      final Map<String, SpaceWeatherAlert> latestPerCme = {};

      for (final sim in decoded) {
        if (sim is Map<String, dynamic>) {
          final impactList = (sim['impactList'] as List?) ?? [];
          final hasMars = impactList.any((i) => i is Map && i['location'] == 'Mars');
          if (!hasMars) continue;

          final alert = SpaceWeatherAlert.fromSimulation(sim);
          final existing = latestPerCme[alert.id];
          if (existing == null || alert.launched.isAfter(existing.launched)) {
            latestPerCme[alert.id] = alert;
          }
        }
      }

      alerts.addAll(latestPerCme.values);
      alerts.sort((a, b) => a.arrival.compareTo(b.arrival));
      return alerts;
    } catch (e) {
      // In case of rate limits or offline state, return empty list gracefully
      return [];
    }
  }
}
