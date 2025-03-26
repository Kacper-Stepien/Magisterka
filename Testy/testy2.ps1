$scenarios = @(100, 1000, 4000)
$records = @(500)
$liczbaTestow = 5


# Dla 100 i 500 rekordów tylko id
foreach ($rows in $records) {
    Write-Host "==========================================="
    Write-Host ">>> ROZPOCZYNAM TESTY DLA $rows WIERSZY (TYLKO ID) <<<"
    Write-Host "==========================================="

    foreach ($vus in $scenarios) {
        for ($i = 1; $i -le $liczbaTestow; $i++) {
            Write-Host "S1. Graphql (samo id) - Uruchamiam test #$i dla VUS: $vus"
            & k6 run --env VUS=$vus --env ROWS=$rows S1-graphql-many-row-one-field.js
            Write-Host "--- KONIEC TESTU #$i (ROWS: $rows, VUS: $vus) ---"
            Start-Sleep -Seconds 120
        }
    }
}

# Dla 100 i 500 rekordów całe wiersze
foreach ($rows in $records) {
    Write-Host "==========================================="
    Write-Host ">>> ROZPOCZYNAM TESTY DLA $rows WIERSZY (PELNE DANE) <<<"
    Write-Host "==========================================="

    foreach ($vus in $scenarios) {
        for ($i = 1; $i -le $liczbaTestow; $i++) {
            Write-Host "S1. Graphql (pełne dane) - Uruchamiam test #$i dla VUS: $vus"
            & k6 run --env VUS=$vus --env ROWS=$rows S1-graphql-many-row.js
            Write-Host "--- KONIEC TESTU #$i (ROWS: $rows, VUS: $vus) ---"
            Start-Sleep -Seconds 120
        }
    }
}


# #Dla 1 rekordu cały wiersz
# Write-Host "==========================================="
# Write-Host ">>> ROZPOCZYNAM TESTY DLA 1 WIERSZA (cały wiersz) <<<"
# Write-Host "==========================================="
# foreach ($vus in $scenarios) {
#     for ($i = 1; $i -le $liczbaTestow; $i++) {
#         Write-Host "S1. Graphql (1 rekord) - Uruchamiam test #$i dla VUS: $vus"
#         & k6 run --env VUS=$vus S1-graphql-one-row.js
#         Write-Host "----------KONIEC TESTU-------------"
#         Start-Sleep -Seconds 120
#     }
# }



# # Dla 1 rekordu tylko id
# Write-Host "==========================================="
# Write-Host ">>> ROZPOCZYNAM TESTY DLA 1 WIERSZA (tylko id)<<<"
# Write-Host "==========================================="
# foreach ($vus in $scenarios) {
#     for ($i = 1; $i -le $liczbaTestow; $i++) {
#         Write-Host "S1. Graphql (1 rekord) samo id - Uruchamiam test #$i dla VUS: $vus"
#         & k6 run --env VUS=$vus S1-graphql-one-row-one-field.js
#         Write-Host "----------KONIEC TESTU-------------"
#         Start-Sleep -Seconds 120
#     }
# }

