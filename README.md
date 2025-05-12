# AngularCoding
Angular Components

This repository contains two reusable, performance-optimized Angular components/services:

 - Countdown Timer Component – Displays a live countdown from a backend-provided deadline.

 - Camera Range Checker – Validates if a group of hardware cameras can meet specific software camera requirements.

1. Countdown Timer Component
    Description: Fetches the number of seconds left to a constant deadline from /api/deadline, and displays a live countdown that updates every second.

Features:
    Fetches initial value once

    Uses RxJS timer for efficient local countdown

    Unsubscribes cleanly on destroy

    Fully reactive using BehaviorSubject

2. Camera Range Checker
    Description: A utility service to verify if multiple hardware cameras together meet the light and distance coverage required by a software camera.

Features:
    Merges overlapping camera ranges

    Verifies full range coverage

    Clean utility-first design