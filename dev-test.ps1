# dev-test.ps1
# Uso: .\dev-test.ps1

Write-Host "Starting TaskFlow..." -ForegroundColor Cyan

$root = $PSScriptRoot
$BACKEND_DIR = "$root\server"
$FRONTEND_DIR = "$root"
$SEED_FILE = "$BACKEND_DIR\src\seeds\tasks.seed.js"
$API_URL = "http://localhost:3000/api/v1/tasks"

# -- 1. Instalar deps si faltan --
if (-not (Test-Path "$BACKEND_DIR\node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Push-Location $BACKEND_DIR; npm install; Pop-Location
}
if (-not (Test-Path "$FRONTEND_DIR\node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Push-Location $FRONTEND_DIR; npm install; Pop-Location
}

# -- 2. Arrancar backend en background --
Write-Host "Starting backend..." -ForegroundColor Yellow
$backendProcess = Start-Process powershell -ArgumentList "-NoProfile", "-Command", "Set-Location '$BACKEND_DIR'; npm run dev" -PassThru -WindowStyle Hidden

# -- 3. Esperar a que el backend este listo --
Write-Host "Waiting for backend..." -ForegroundColor Yellow
$maxWait = 15
$count = 0
$ready = $false

while ($count -lt $maxWait) {
    Start-Sleep -Seconds 1
    $count++
    try {
        Invoke-WebRequest -Uri $API_URL -Method GET -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop | Out-Null
        $ready = $true
        break
    } catch {
        Write-Host "    Waiting... ($count of $maxWait s)" -ForegroundColor Gray
    }
}

if (-not $ready) {
    Write-Host "ERROR: Backend did not respond in $maxWait s." -ForegroundColor Red
    Stop-Process -Id $backendProcess.Id -Force -ErrorAction SilentlyContinue
    exit 1
}

Write-Host "    Backend ready" -ForegroundColor Green

# -- 4. Inyectar seed en el backend que ya esta corriendo --
Write-Host "Injecting seed tasks..." -ForegroundColor Yellow
Push-Location $BACKEND_DIR
node $SEED_FILE
Pop-Location

# -- 5. Arrancar frontend y mostrar logs de ambos --
Write-Host "Starting frontend..." -ForegroundColor Cyan
Write-Host "Backend running (PID $($backendProcess.Id)) | Frontend starting..." -ForegroundColor Gray
Write-Host ""

Push-Location $FRONTEND_DIR
npm run dev
Pop-Location

# Al salir del frontend, matar el backend
Write-Host "Stopping backend..." -ForegroundColor Yellow
Stop-Process -Id $backendProcess.Id -Force -ErrorAction SilentlyContinue