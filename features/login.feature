Feature: Login Feature
  As a user
  I want to login into the application
  So that I can access my dashboard

  @login @smoke
  Scenario: Successful login with valid credentials
    Given saya berada di halaman home
    And saya click icon people
    Then saya berada di halaman login
    When saya masukkan email "khabibfahrurrizal@gmail.com"
    And saya masukkan sandi "P@ssw0rd2025"
    And saya click masuk button
    And menampilkan pop up banner di halaman home user
    When saya click button x  
