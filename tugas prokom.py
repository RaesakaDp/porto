print('-------Tugas Pertama-----')
print('======================')
print('')

angka_1 = int(input('masukkan angka pertama : '))
option = input('pilih opsi  *, /:  ')

angka_2 = int(input('masukkan angka kedua : '))
option = input('pilih opsi *, /:  ')

angka_3 = int(input('masukkan angka ketiga : '))

# opsi
opsi_kali = angka_1 * angka_2 * angka_3
opsi_bagi = angka_1 * angka_2 / angka_3
opsi_bagi = angka_1 / angka_2 * angka_3
print('=================================')

if option == '*':
    print('Hasilnya adalah :  ' + str(opsi_kali))
elif option == '/':
    print('Hasilnya adalah :  ' + str(opsi_bagi))

print('--------------------------------------------------------------5')
