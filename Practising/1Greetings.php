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

    if (isset($_POST['submit'])) {

        $user = trim($_POST['username']);
        $alert = '';
        if (empty($user)) {
            $alert = 'Please enter your username';
        }
        else {
            $output = 'Greetings, ' . $user . '!';
        }
    }
    ?>

        <form action="1Greetings.php" method="post" class="row mt-5 border border-2 border-dark d-flex align-items-center">

            <div class="col-12">
                <Label for="username">Enter Username:</Label>
            </div>
            <div class="col-12 mt-2">
                <input type="text" placeholder="Enter username" id="username" name="username">
            </div>
            <div class="col-12">
               <input type="submit" value="Submit" class="btn btn-primary mt-3"  name="submit">
            </div>
            <div class="col-12">
                <?php if (isset($_POST['submit']) && !empty($output)): ?>
                    <div class="alert alert-success mt-3">
                        <?= $output ?>
                    </div>
                <?php endif; ?>

                <?php if (isset($_POST['submit']) && empty($output)): ?>
                    <div class="alert alert-danger mt-3">
                        <p><?= $alert ?></p>
                    </div>
                <?php endif; ?>
            </div>

        </form>

</div>

</body>

</html>

