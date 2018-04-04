/**
 * @license Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

/**
 * Adjustments needed for DevTools network throttling to simulate
 * more realistic network conditions.
 * See: crbug.com/721112
 */
const DEVTOOLS_RTT_ADJUSTMENT_FACTOR = 3.75;
const DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR = 0.9;

const throttling = {
  DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
  DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
  mobile3G: {
    rttMs: 150,
    throughputKbps: 1.6 * 1024,
    requestLatencyMs: 150 * DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
    downloadThroughputKbps: 1.6 * 1024 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
    uploadThroughputKbps: 750 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
    cpuSlowdownMultiplier: 4,
  },
};

const defaultSettings = {
  maxWaitForLoad: 45 * 1000,
  throttlingMethod: 'devtools',
  throttling: throttling.mobile3G,
};

const defaultPassConfig = {
  passName: 'defaultPass',
  recordTrace: false,
  useThrottling: false,
  pauseAfterLoadMs: 0,
  networkQuietThresholdMs: 0,
  cpuQuietThresholdMs: 0,
  blockedUrlPatterns: [],
  blankPage: 'about:blank',
  blankDuration: 300,
  gatherers: [],
};

const defaultAuditOptions = {
  'bootup-time': {
    // see https://www.desmos.com/calculator/rkphawothk
    // <500ms ~= 100, >2s is yellow, >3.5s is red
    scorePODR: 600,
    scoreMedian: 3500,
  },
  'total-byte-weight': {
    // see https://www.desmos.com/calculator/gpmjeykbwr
    // ~75th and ~90th percentiles http://httparchive.org/interesting.php?a=All&l=Feb%201%202017&s=All#bytesTotal
    scorePODR: 2500 * 1024,
    scoreMedian: 4000 * 1024,
  },
  'uses-long-cache-ttl': {
    // see https://www.desmos.com/calculator/zokzso8umm
    scorePODR: 4 * 1024,
    scoreMedian: 768 * 1024,
  },
  'consistently-interactive': {
    // see https://www.desmos.com/calculator/uti67afozh
    scorePODR: 1700,
    scoreMedian: 10000,
  },
  'dom-size': {
    // see https://www.desmos.com/calculator/9cyxpm5qgp
    scorePODR: 2400,
    scoreMedian: 3000,
  },
  'estimated-input-latency': {
    // see https://www.desmos.com/calculator/srv0hqhf7d
    scorePODR: 50,
    scoreMedian: 100,
  },
  'first-interactive': {
    // see https://www.desmos.com/calculator/uti67afozh
    scorePODR: 1700,
    scoreMedian: 10000,
  },
  'first-meaningful-paint': {
    // see https://www.desmos.com/calculator/joz3pqttdq
    scorePODR: 1600,
    scoreMedian: 4000,
  },
  'mainthread-work-breakdown': {
    // see https://www.desmos.com/calculator/s2eqcifkum
    scorePODR: 1500,
    scoreMedian: 4000,
  },
  'speed-index-metric': {
    // see https://www.desmos.com/calculator/mdgjzchijg
    scorePODR: 1250,
    scoreMedian: 5500,
  },
};

module.exports = {
  throttling,
  defaultSettings,
  defaultPassConfig,
  defaultAuditOptions,
};
