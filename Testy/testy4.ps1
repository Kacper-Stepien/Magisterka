$scenarios = @(2000)
$liczbaTestow = 5

Write-Host "==========================================="
Write-Host ">>> ROZPOCZYNAM TESTY DLA S4<<<"
Write-Host "==========================================="
foreach ($vus in $scenarios) {
    for ($i = 1; $i -le $liczbaTestow; $i++) {
        Write-Host "S4. REST - Uruchamiam test #$i dla VUS: $vus"
        & k6 run --env VUS=$vus S4-rest.js
        Write-Host "----------KONIEC TESTU-------------"
        Start-Sleep -Seconds 120
    }
}


Write-Host "==========================================="
Write-Host ">>> ROZPOCZYNAM TESTY DLA S4 jeden endpoint<<<"
Write-Host "==========================================="
foreach ($vus in $scenarios) {
    for ($i = 1; $i -le $liczbaTestow; $i++) {
        Write-Host "S4. REST  jeden endpoint - Uruchamiam test #$i dla VUS: $vus"
        & k6 run --env VUS=$vus  S4-rest-one-endpoint.js
        Write-Host "----------KONIEC TESTU-------------"
        Start-Sleep -Seconds 120
    }
}

Write-Host "==========================================="
Write-Host ">>> ROZPOCZYNAM TESTY DLA S3<<<"
Write-Host "==========================================="
foreach ($vus in $scenarios) {
    for ($i = 1; $i -le $liczbaTestow; $i++) {
        Write-Host "S3. REST - Uruchamiam test #$i dla VUS: $vus"
        & k6 run --env VUS=$vus S3-rest.js
        Write-Host "----------KONIEC TESTU-------------"
        Start-Sleep -Seconds 120
    }
}


Write-Host "==========================================="
Write-Host ">>> ROZPOCZYNAM TESTY DLA S3 jeden endpoint<<<"
Write-Host "==========================================="
foreach ($vus in $scenarios) {
    for ($i = 1; $i -le $liczbaTestow; $i++) {
        Write-Host "S3. REST  jeden endpoint - Uruchamiam test #$i dla VUS: $vus"
        & k6 run --env VUS=$vus  S3-rest-one-endpoint.js
        Write-Host "----------KONIEC TESTU-------------"
        Start-Sleep -Seconds 120
    }
}


Write-Host "==========================================="
Write-Host ">>> ROZPOCZYNAM TESTY DLA S2<<<"
Write-Host "==========================================="
foreach ($vus in $scenarios) {
    for ($i = 1; $i -le $liczbaTestow; $i++) {
        Write-Host "S2. REST - Uruchamiam test #$i dla VUS: $vus"
        & k6 run --env VUS=$vus S2-rest.js
        Write-Host "----------KONIEC TESTU-------------"
        Start-Sleep -Seconds 120
    }
}


Write-Host "==========================================="
Write-Host ">>> ROZPOCZYNAM TESTY DLA S2 jeden endpoint<<<"
Write-Host "==========================================="
foreach ($vus in $scenarios) {
    for ($i = 1; $i -le $liczbaTestow; $i++) {
        Write-Host "S2. REST jeden endpoint - Uruchamiam test #$i dla VUS: $vus"
        & k6 run --env VUS=$vus  S2-rest-one-endpoint.js
        Write-Host "----------KONIEC TESTU-------------"
        Start-Sleep -Seconds 120
    }
}
