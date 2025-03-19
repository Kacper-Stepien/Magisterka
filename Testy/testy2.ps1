$scenarios = @(1000)
$liczbaTestow = 2

foreach ($vus in $scenarios) {
    for ($i = 1; $i -le $liczbaTestow; $i++) {
        Write-Host "S3. REST jeden endpoint - Uruchamiam test #$i dla VUS: $vus"
        & k6 run --env VUS=$vus S3-rest-one-endpoint.js
        Write-Host "----------KONIEC TESTU-------------"
        Start-Sleep -Seconds 120
    }
}

# foreach ($vus in $scenarios) {
#     for ($i = 1; $i -le $liczbaTestow; $i++) {
#         Write-Host "S3. GraphQL wybrane pola - Uruchamiam test #$i dla VUS: $vus"
#         & k6 run --env VUS=$vus S3-graphql-one-field.js
#         Write-Host "----------KONIEC TESTU-------------"
#         Start-Sleep -Seconds 120
#     }
# }
