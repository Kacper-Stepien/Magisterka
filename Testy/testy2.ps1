$scenarios = @(4000)
$liczbaTestow = 5

foreach ($vus in $scenarios) {
    for ($i = 1; $i -le $liczbaTestow; $i++) {
        Write-Host "REST jeden endpoint - Uruchamiam test #$i dla VUS: $vus"
        & k6 run --env VUS=$vus S2-rest-one-endpoint.js
        Write-Host "----------KONIEC TESTU-------------"
        Start-Sleep -Seconds 120
    }
}
