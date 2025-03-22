$scenarios = @(100, 1000, 4000)
$liczbaTestow = 3


# foreach ($vus in $scenarios) {
#     for ($i = 1; $i -le $liczbaTestow; $i++) {
#         Write-Host "S3. GraphQL - Uruchamiam test #$i dla VUS: $vus"
#         & k6 run --env VUS=$vus S3-graphql.js
#         Write-Host "----------KONIEC TESTU-------------"
#         Start-Sleep -Seconds 120
#     }
# }

# foreach ($vus in $scenarios) {
#     for ($i = 1; $i -le $liczbaTestow; $i++) {
#         Write-Host "S3. GraphQL wybrane dane - Uruchamiam test #$i dla VUS: $vus"
#         & k6 run --env VUS=$vus S3-graphql-one-field.js
#         Write-Host "----------KONIEC TESTU-------------"
#         Start-Sleep -Seconds 120
#     }
# }

foreach ($vus in $scenarios) {
    for ($i = 1; $i -le $liczbaTestow; $i++) {
        Write-Host "S2. GraphQL wybrane dane - Uruchamiam test #$i dla VUS: $vus"
        & k6 run --env VUS=$vus S2-graphql-one-field.js
        Write-Host "----------KONIEC TESTU-------------"
        Start-Sleep -Seconds 120
    }
}


foreach ($vus in $scenarios) {
    for ($i = 1; $i -le $liczbaTestow; $i++) {
        Write-Host "S2. GraphQL - Uruchamiam test #$i dla VUS: $vus"
        & k6 run --env VUS=$vus S2-graphql.js
        Write-Host "----------KONIEC TESTU-------------"
        Start-Sleep -Seconds 120
    }
}


