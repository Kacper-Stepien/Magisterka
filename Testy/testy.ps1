Write-Host "=== Uruchamiam test #1 ==="
k6 run S2-rest.js
Write-Host "[INFO] Test #1 zakonczony!"

Write-Host "[INFO] Czekam 3 minuty..."
Start-Sleep -Seconds 180

Write-Host "=== Uruchamiam test #2 ==="
k6 run S2-rest.js
Write-Host "[INFO] Test #2 zakonczony!"

Write-Host "[INFO] Czekam 3 minuty..."
Start-Sleep -Seconds 180

Write-Host "=== Uruchamiam test #3 ==="
k6 run S2-rest.js
Write-Host "[INFO] Test #3 zakonczony!"

Write-Host "[INFO] Czekam 3 minuty..."
Start-Sleep -Seconds 180

Write-Host "=== Uruchamiam test #4 ==="
k6 run S2-rest.js
Write-Host "[INFO] Test #4 zakonczony!"

Write-Host "[INFO] Czekam 3 minuty..."
Start-Sleep -Seconds 180

Write-Host "=== Uruchamiam test #5 ==="
k6 run S2-rest.js
Write-Host "[INFO] Test #5 zakonczony!"


Write-Host "=============================="
Write-Host "Wszystkie testy wykonane."
Write-Host "Wcisnij Enter, aby zamknac..."
[void][System.Console]::ReadLine()
