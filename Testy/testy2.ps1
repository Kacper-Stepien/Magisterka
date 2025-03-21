$scenarios = @(100, 1000, 4000)
$liczbaTestow = 5

# foreach ($vus in $scenarios) {
#     for ($i = 1; $i -le $liczbaTestow; $i++) {
#         Write-Host "S2. GraphQL wybrane dane zoptymalizowane - Uruchamiam test #$i dla VUS: $vus"
#         & k6 run --env VUS=$vus S2-graphql-one-field-optimized.js
#         Write-Host "----------KONIEC TESTU-------------"
#         Start-Sleep -Seconds 120
#     }
# }

foreach ($vus in $scenarios) {
    for ($i = 1; $i -le $liczbaTestow; $i++) {
        Write-Host "S1. GraphQL (100 rekordów) wybrane dane zoptymalizowane - Uruchamiam test #$i dla VUS: $vus"
        & k6 run --env VUS=$vus S1-graphql-many-row-one-field-optimized.js
        Write-Host "----------KONIEC TESTU-------------"
        Start-Sleep -Seconds 120
    }
}

foreach ($vus in $scenarios) {
    for ($i = 1; $i -le $liczbaTestow; $i++) {
        Write-Host "S1. GraphQL (1 rekord) wybrane dane zoptymalizowane - Uruchamiam test #$i dla VUS: $vus"
        & k6 run --env VUS=$vus S1-graphql-one-row-one-field-optimalized.js
        Write-Host "----------KONIEC TESTU-------------"
        Start-Sleep -Seconds 120
    }
}

