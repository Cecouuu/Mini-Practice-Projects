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

    $output = '';

    if (isset($_POST['submit'])){

        $ageCheck = $_POST['age'];
        $alert = '';
        if ($ageCheck < 18){
            $alert = 'Your Age must be 18 years or older.';
        }
        else {
            $output = 'Welcome to the website, you are: ' . $ageCheck . ' years old';
        }
    }
    ?>

        <div class="card mt-5" style="width: 500px;">

            <div class="card-body d-block align-items-center justify-content-center">
                <form action="2AgeCheck.php" method="post" class=" align-items-center justify-content-center">

                    <label for="age">Enter your Age:</label>
                    <input type="number" id="age" name="age" placeholder="Enter you age here." class="mt-3"><br>

                    <input type="submit" value="Submit" name="submit" class="btn btn-primary mt-3"><br>

                    <?php if (isset($_POST['submit']) && !empty($output) ) : ?>
                    <div class="alert alert-success mt-3">
                        <?= $output ?>
                    </div>
                    <?php endif; ?>
                    <?php if (isset($_POST['submit']) && empty($output) ) : ?>
                        <div class="alert alert-danger mt-3">
                            <p><?= $alert ?></p>
                        </div>
                    <?php endif; ?>
                </form>
            </div>

        </div>

</div>

</body>

</html>

