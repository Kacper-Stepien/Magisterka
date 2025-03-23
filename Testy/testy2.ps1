$scenarios = @(100, 1000, 4000)
$liczbaTestow = 5


foreach ($vus in $scenarios) {
    for ($i = 1; $i -le $liczbaTestow; $i++) {
        Write-Host "S4. REST - Uruchamiam test #$i dla VUS: $vus"
        & k6 run --env VUS=$vus S4-rest.js
        Write-Host "----------KONIEC TESTU-------------"
        Start-Sleep -Seconds 120
    }
}

foreach ($vus in $scenarios) {
    for ($i = 1; $i -le $liczbaTestow; $i++) {
        Write-Host "S4. REST jeden endpoint - Uruchamiam test #$i dla VUS: $vus"
        & k6 run --env VUS=$vus S4-rest-one-endpoint.js
        Write-Host "----------KONIEC TESTU-------------"
        Start-Sleep -Seconds 120
    }
}

