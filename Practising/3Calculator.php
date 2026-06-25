<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

</head>

<body class="bg-light">
<div class="container d-flex align-items-center justify-content-center">

    <?php

    ?>
    <div class="card">
        <div class="card-body">
            <form method="POST" action="3Calculator.php" class="">
                <label for="passwordLength"></label>
                <input type="number" id="passwordLength" name="passwordLength" placeholder="Choose password length."><br>

                <input type="checkbox" name="uppercase" id="uppercase" value="Uppercase">
                <label for="uppercase">UpperCase</label><br>

                <input type="checkbox" name="lowercase" id="lowercase" value="Lowercase">
                <label for="lowercase">LowerCase</label><br>

                <input type="checkbox" name="specialSymbols" id="specialSymbols" value="SpecialSymbols">
                <label for="specialSymbols">SpecialSymbols</label><br>

                <input type="submit" class="btn btn-primary" name="submit" value="Submit">
            </form>
        </div>
    </div>




</div>

</body>

</html>

