$scenarios = @(2000)
$records = @(100, 500)
$liczbaTestow = 10


# Dla 100 i 500 rekordów
foreach ($rows in $records) {
    Write-Host "==========================================="
    Write-Host ">>> ROZPOCZYNAM TESTY DLA $rows WIERSZ <<<"
    Write-Host "==========================================="

    foreach ($vus in $scenarios) {
        for ($i = 1; $i -le $liczbaTestow; $i++) {
            Write-Host "S1. REST - Uruchamiam test #$i dla VUS: $vus"
            & k6 run --env VUS=$vus --env ROWS=$rows S1-rest-many-row.js
            Write-Host "--- KONIEC TESTU #$i (ROWS: $rows, VUS: $vus) ---"
            Start-Sleep -Seconds 120
        }
    }
}

#Dla 1 rekordu cały wiersz
Write-Host "==========================================="
Write-Host ">>> ROZPOCZYNAM TESTY DLA S1 1 rekord <<<"
Write-Host "==========================================="
foreach ($vus in $scenarios) {
    for ($i = 1; $i -le $liczbaTestow; $i++) {
        Write-Host "S1. REST jeden rekord - Uruchamiam test #$i dla VUS: $vus"
        & k6 run --env VUS=$vus S1-rest-one-row.js
        Write-Host "----------KONIEC TESTU-------------"
        Start-Sleep -Seconds 120
    }
}

# # Dla 100 i 500 rekordów tylko id
# foreach ($rows in $records) {
#     Write-Host "==========================================="
#     Write-Host ">>> ROZPOCZYNAM TESTY DLA $rows WIERSZ(TYLKO ID) <<<"
#     Write-Host "==========================================="

#     foreach ($vus in $scenarios) {
#         for ($i = 1; $i -le $liczbaTestow; $i++) {
#             Write-Host "S1. Graphql (samo id) - Uruchamiam test #$i dla VUS: $vus"
#             & k6 run --env VUS=$vus --env ROWS=$rows S1-graphql-many-row-one-field.js
#             Write-Host "--- KONIEC TESTU #$i (ROWS: $rows, VUS: $vus) ---"
#             Start-Sleep -Seconds 120
#         }
#     }
# }

# Write-Host "==========================================="
# Write-Host ">>> ROZPOCZYNAM TESTY DLA S1 jeden wiersz <<<"
# Write-Host "==========================================="
# foreach ($vus in $scenarios) {
#     for ($i = 1; $i -le $liczbaTestow; $i++) {
#         Write-Host "S1. Graphql pełne dane - Uruchamiam test #$i dla VUS: $vus"
#         & k6 run --env VUS=$vus S1-graphql-one-row.js
#         Write-Host "----------KONIEC TESTU-------------"
#         Start-Sleep -Seconds 120
#     }
# }

# Write-Host "==========================================="
# Write-Host ">>> ROZPOCZYNAM TESTY DLA S1 jeden wiersz, tylko ID <<<"
# Write-Host "==========================================="
# foreach ($vus in $scenarios) {
#     for ($i = 1; $i -le $liczbaTestow; $i++) {
#         Write-Host "S1. Graphql pełne dane - Uruchamiam test #$i dla VUS: $vus"
#         & k6 run --env VUS=$vus S1-graphql-one-row-one-field.js
#         Write-Host "----------KONIEC TESTU-------------"
#         Start-Sleep -Seconds 120
#     }
# }




# # Dla 100 i 500 rekordów całe wiersze
# foreach ($rows in $records) {
#     Write-Host "==========================================="
#     Write-Host ">>> ROZPOCZYNAM TESTY DLA $rows WIERSZY (PELNE DANE) <<<"
#     Write-Host "==========================================="

#     foreach ($vus in $scenarios) {
#         for ($i = 1; $i -le $liczbaTestow; $i++) {
#             Write-Host "S1. Graphql (pełne dane) - Uruchamiam test #$i dla VUS: $vus"
#             & k6 run --env VUS=$vus --env ROWS=$rows S1-graphql-many-row.js
#             Write-Host "--- KONIEC TESTU #$i (ROWS: $rows, VUS: $vus) ---"
#             Start-Sleep -Seconds 120
#         }
#     }
# }


# #Dla 1 rekordu cały wiersz
# Write-Host "==========================================="
# Write-Host ">>> ROZPOCZYNAM TESTY DLA S4 całe wiersze <<<"
# Write-Host "==========================================="
# foreach ($vus in $scenarios) {
#     for ($i = 1; $i -le $liczbaTestow; $i++) {
#         Write-Host "S4. Graphql pełne dane - Uruchamiam test #$i dla VUS: $vus"
#         & k6 run --env VUS=$vus S4-graphql.js
#         Write-Host "----------KONIEC TESTU-------------"
#         Start-Sleep -Seconds 120
#     }
# }



# #Dla 1 rekordu cały wiersz
# Write-Host "==========================================="
# Write-Host ">>> ROZPOCZYNAM TESTY DLA S4 wybrane dane <<<"
# Write-Host "==========================================="
# foreach ($vus in $scenarios) {
#     for ($i = 1; $i -le $liczbaTestow; $i++) {
#         Write-Host "S4. Graphql pełne dane - Uruchamiam test #$i dla VUS: $vus"
#         & k6 run --env VUS=$vus S4-graphql-one-field.js
#         Write-Host "----------KONIEC TESTU-------------"
#         Start-Sleep -Seconds 120
#     }
# }


# #Dla 1 rekordu cały wiersz
# Write-Host "==========================================="
# Write-Host ">>> ROZPOCZYNAM TESTY DLA S4 wybrane dane (zoptymalizowane) <<<"
# Write-Host "==========================================="
# foreach ($vus in $scenarios) {
#     for ($i = 1; $i -le $liczbaTestow; $i++) {
#         Write-Host "S4. Graphql pełne dane - Uruchamiam test #$i dla VUS: $vus"
#         & k6 run --env VUS=$vus S4-graphql-one-field-optimized.js
#         Write-Host "----------KONIEC TESTU-------------"
#         Start-Sleep -Seconds 120
#     }
# }
