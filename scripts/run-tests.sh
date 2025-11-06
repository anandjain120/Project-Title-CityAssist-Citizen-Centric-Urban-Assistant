#!/bin/bash

# CityAssist Test Runner
# Runs all test suites

set -e

echo "Running CityAssist Test Suites..."
echo "=================================="

# Frontend tests
echo "Running frontend tests..."
cd frontend
if [ -f "package.json" ]; then
    npm test
    echo "Frontend tests completed ✓"
else
    echo "Frontend tests skipped (no package.json)"
fi
cd ..

# Backend tests
echo "Running backend tests..."
cd backend
if [ -f "build.gradle" ]; then
    ./gradlew test
    echo "Backend tests completed ✓"
else
    echo "Backend tests skipped (no build.gradle)"
fi
cd ..

# ML services tests
echo "Running ML services tests..."
cd ml-services
if [ -f "requirements.txt" ]; then
    pytest
    echo "ML services tests completed ✓"
else
    echo "ML services tests skipped (no requirements.txt)"
fi
cd ..

echo "=================================="
echo "All tests completed!"

