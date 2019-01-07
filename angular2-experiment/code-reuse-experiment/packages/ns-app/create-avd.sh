#!/usr/bin/env bash
sdkmanager "system-images;android-25;google_apis;x86"
avdmanager create avd --name test --package "system-images;android-25;google_apis;x86"
