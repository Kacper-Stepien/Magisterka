$scenarios = @(2000)
$liczbaTestow = 5

# Write-Host "==========================================="
# Write-Host ">>> ROZPOCZYNAM TESTY DLA S2<<<"
# Write-Host "==========================================="
# foreach ($vus in $scenarios) {
#     for ($i = 1; $i -le $liczbaTestow; $i++) {
#         Write-Host "S2. GraphQL - Uruchamiam test #$i dla VUS: $vus"
#         & k6 run --env VUS=$vus S2-graphql.js
#         Write-Host "----------KONIEC TESTU-------------"
#         Start-Sleep -Seconds 120
#     }
# }

# Write-Host "==========================================="
# Write-Host ">>> ROZPOCZYNAM TESTY DLA S2 (wybrane dane)<<<"
# Write-Host "==========================================="
# foreach ($vus in $scenarios) {
#     for ($i = 1; $i -le $liczbaTestow; $i++) {
#         Write-Host "S2. GraphQL (wybrane dane) - Uruchamiam test #$i dla VUS: $vus"
#         & k6 run --env VUS=$vus S2-graphql-one-field.js
#         Write-Host "----------KONIEC TESTU-------------"
#         Start-Sleep -Seconds 120
#     }
# }

# Write-Host "==========================================="
# Write-Host ">>> ROZPOCZYNAM TESTY DLA S3<<<"
# Write-Host "==========================================="
# foreach ($vus in $scenarios) {
#     for ($i = 1; $i -le $liczbaTestow; $i++) {
#         Write-Host "S3. GraphQL - Uruchamiam test #$i dla VUS: $vus"
#         & k6 run --env VUS=$vus S3-graphql.js
#         Write-Host "----------KONIEC TESTU-------------"
#         Start-Sleep -Seconds 120
#     }
# }

# Write-Host "==========================================="
# Write-Host ">>> ROZPOCZYNAM TESTY DLA S3 (wybrane dane)<<<"
# Write-Host "==========================================="
# foreach ($vus in $scenarios) {
#     for ($i = 1; $i -le $liczbaTestow; $i++) {
#         Write-Host "S3. GraphQL (wybrane dane) - Uruchamiam test #$i dla VUS: $vus"
#         & k6 run --env VUS=$vus S3-graphql-one-field.js
#         Write-Host "----------KONIEC TESTU-------------"
#         Start-Sleep -Seconds 120
#     }
# }

Write-Host "==========================================="
Write-Host ">>> ROZPOCZYNAM TESTY DLA S4<<<"
Write-Host "==========================================="
foreach ($vus in $scenarios) {
    for ($i = 1; $i -le $liczbaTestow; $i++) {
        Write-Host "S4. GraphQL - Uruchamiam test #$i dla VUS: $vus"
        & k6 run --env VUS=$vus S4-graphql.js
        Write-Host "----------KONIEC TESTU-------------"
        Start-Sleep -Seconds 120
    }
}

Write-Host "==========================================="
Write-Host ">>> ROZPOCZYNAM TESTY DLA S4 (wybrane dane)<<<"
Write-Host "==========================================="
foreach ($vus in $scenarios) {
    for ($i = 1; $i -le $liczbaTestow; $i++) {
        Write-Host "S4. GraphQL  wybrane dane - Uruchamiam test #$i dla VUS: $vus"
        & k6 run --env VUS=$vus S4-graphql-one-field.js
        Write-Host "----------KONIEC TESTU-------------"
        Start-Sleep -Seconds 120
    }
}


