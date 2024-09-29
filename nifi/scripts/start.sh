#!/bin/sh -e

#    Licensed to the Apache Software Foundation (ASF) under one or more
#    contributor license agreements.  See the NOTICE file distributed with
#    this work for additional information regarding copyright ownership.
#    The ASF licenses this file to You under the Apache License, Version 2.0
#    (the "License"); you may not use this file except in compliance with
#    the License.  You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS,
#    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#    See the License for the specific language governing permissions and
#    limitations under the License.

scripts_dir='/opt/nifi/scripts'

[ -f "${scripts_dir}/common.sh" ] && . "${scripts_dir}/common.sh"

# Override JVM memory settings
if [ ! -z "${NIFI_JVM_HEAP_INIT}" ]; then
    prop_replace 'java.arg.2'       "-Xms${NIFI_JVM_HEAP_INIT}" ${nifi_bootstrap_file}
fi

if [ ! -z "${NIFI_JVM_HEAP_MAX}" ]; then
    prop_replace 'java.arg.3'       "-Xmx${NIFI_JVM_HEAP_MAX}" ${nifi_bootstrap_file}
fi

if [ ! -z "${NIFI_JVM_DEBUGGER}" ]; then
    uncomment "java.arg.debug" ${nifi_bootstrap_file}
fi

# Establish baseline properties
prop_replace 'nifi.web.http.port'               "${NIFI_WEB_HTTP_PORT:-8080}"
prop_replace 'nifi.web.http.host'               "${NIFI_WEB_HTTP_HOST:-$HOSTNAME}"
prop_replace 'nifi.remote.input.host'           "${NIFI_REMOTE_INPUT_HOST:-$HOSTNAME}"
prop_replace 'nifi.remote.input.socket.port'    "${NIFI_REMOTE_INPUT_SOCKET_PORT:-10000}"
prop_replace 'nifi.remote.input.secure'         'false'

# Comment out nifi security properties
comment "nifi.web.https.host" ${nifi_props_file}
comment "nifi.web.https.port" ${nifi_props_file}
comment "nifi.security.keystore" ${nifi_props_file}
comment "nifi.security.keystoreType" ${nifi_props_file}
comment "nifi.security.keystorePasswd" ${nifi_props_file}
comment "nifi.security.keyPasswd" ${nifi_props_file}
comment "nifi.security.truststore" ${nifi_props_file}
comment "nifi.security.truststoreType" ${nifi_props_file}
comment "nifi.security.truststorePasswd" ${nifi_props_file}

# Set analytics properties
prop_replace 'nifi.analytics.predict.enabled'                   "${NIFI_ANALYTICS_PREDICT_ENABLED:-false}"
prop_replace 'nifi.analytics.predict.interval'                  "${NIFI_ANALYTICS_PREDICT_INTERVAL:-3 mins}"
prop_replace 'nifi.analytics.query.interval'                    "${NIFI_ANALYTICS_QUERY_INTERVAL:-5 mins}"
prop_replace 'nifi.analytics.connection.model.implementation'   "${NIFI_ANALYTICS_MODEL_IMPLEMENTATION:-org.apache.nifi.controller.status.analytics.models.OrdinaryLeastSquares}"
prop_replace 'nifi.analytics.connection.model.score.name'       "${NIFI_ANALYTICS_MODEL_SCORE_NAME:-rSquared}"
prop_replace 'nifi.analytics.connection.model.score.threshold'  "${NIFI_ANALYTICS_MODEL_SCORE_THRESHOLD:-.90}"

# Continuously provide logs so that 'docker logs' can produce them
"${NIFI_HOME}/bin/nifi.sh" run &
nifi_pid="$!"
tail -F --pid=${nifi_pid} "${NIFI_HOME}/logs/nifi-app.log" &

trap 'echo Received trapped signal, beginning shutdown...;./bin/nifi.sh stop;exit 0;' TERM HUP INT;
trap ":" EXIT

echo NiFi running with PID ${nifi_pid}.
wait ${nifi_pid}
