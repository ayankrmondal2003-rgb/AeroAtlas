class SpaceWeatherAlert {
  final String id;
  final DateTime launched;
  final DateTime arrival;
  final double? speed;
  final bool isGlancing;
  final String? reportLink;

  SpaceWeatherAlert({
    required this.id,
    required this.launched,
    required this.arrival,
    this.speed,
    required this.isGlancing,
    this.reportLink,
  });

  bool get isArrivingSoon {
    final now = DateTime.now().toUtc();
    final difference = arrival.difference(now);
    return difference.inHours >= -24 && difference.inHours <= 72;
  }

  String get arrivalSummary {
    final now = DateTime.now().toUtc();
    final diff = arrival.difference(now);
    if (diff.isNegative) {
      final hoursAgo = diff.inHours.abs();
      return '$hoursAgo h ago (passing)';
    } else if (diff.inHours < 1) {
      return 'Due now (< 1h)';
    } else {
      return 'Due in ${diff.inHours} h';
    }
  }

  factory SpaceWeatherAlert.fromSimulation(Map<String, dynamic> json) {
    final cmeList = (json['cmeInputs'] as List?) ?? [];
    final firstCme = cmeList.isNotEmpty ? cmeList[0] as Map<String, dynamic> : {};
    
    final impactList = (json['impactList'] as List?) ?? [];
    final marsHit = impactList.firstWhere(
      (item) => (item as Map<String, dynamic>)['location'] == 'Mars',
      orElse: () => null,
    );

    final cmeId = firstCme['CMEID'] ?? json['simulationID'] ?? 'UNKNOWN';
    final launchStr = firstCme['cmeStartTime'] ?? json['modelCompletionTime'];
    final arrivalStr = marsHit != null ? marsHit['arrivalTime'] : null;

    return SpaceWeatherAlert(
      id: cmeId.toString(),
      launched: launchStr != null ? DateTime.parse(launchStr) : DateTime.now(),
      arrival: arrivalStr != null ? DateTime.parse(arrivalStr) : DateTime.now(),
      speed: (firstCme['speed'] as num?)?.toDouble(),
      isGlancing: marsHit != null ? (marsHit['isGlancingBlow'] == true) : false,
      reportLink: json['link'] as String?,
    );
  }
}
