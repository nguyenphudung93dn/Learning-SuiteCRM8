<?php
// URL: http://loc.suitecrm8/legacy/index.php?entryPoint=API_Clone_DATA_FROM_SuiteCRM7
$accountBean = new Account();
//Get the Name field on account bean
$accountBean->name = 'New account name';
//Set the billing address post code of an account
$accountBean->billing_address_postalcode = '12345';
//Save both changes.
$accountBean->save();



die;