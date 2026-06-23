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


        $number1 = $_POST['Number1'] ?? null;
        $number2 = $_POST['Number2'] ?? null;
        $operator = $_POST['Operator'] ?? '';

        $alert = '';
        $result = false;

        $totalSum = 0;
        if (isset($_POST['Submit'])) {

            if(!empty($_POST['Number1']) && !empty($_POST['Number2']) && !empty($_POST['Operator'])) {
                if ($operator == '+') {
                    $totalSum = $number1 + $number2;
                    $result = true;
                }
                elseif ($operator == '-') {
                    $totalSum = $number1 - $number2;
                    $result = true;
                }
                elseif ($operator == "*"){
                    $totalSum = $number1 * $number2;
                    $result = true;
                }
                elseif ($operator == '/') {
                    $totalSum = $number1 / $number2;
                    $result = true;
                }
                elseif ($operator == "%"){
                    $totalSum = $number1 % $number2;
                    $result = true;
                }
                elseif ($operator == "**"){
                    $totalSum = pow($number1, $number2);
                    $result = true;
                }
               elseif($operator == '/' && $number2 == 0){
                    $alert = "Division by zero is not allowed.";
                }
            }
            else {
                $alert = "Please enter valid values that are needed!";
            }


        }
    ?>
    <div class="card">
        <div class="card-body">
            <form method="POST" action="3Calculator.php" class="form-inline mt-5">

                <div class="form-group">
                    <label for="number1">Type your first number:</label>
                    <input type="number" id="number1" name="Number1" class="form-control" value="<?= $number1 ?>">
                </div>
                <div class="form-group">
                    <label for="number2">Type your second number:</label>
                    <input type="number" id="number2" name="Number2" class="form-control" value="<?= $number2 ?>">
                </div>

                <div class="form-group">
                    <label for="operator">Method</label><br>
                    <select class="form-control" id="operator" name="Operator">
                        <option value="">Choose method</option>
                        <option value="+">Addition (+)</option>
                        <option value="-">Subtraction (-)</option>
                        <option value="*">Multiplication (*)</option>
                        <option value="/">Division (/)</option>
                        <option value="%">Modulo (%)</option>
                        <option value="**">Power (^)</option>
                    </select>
                </div>

                <div class="form-group mt-2">
                    <input type="submit" class="btn btn-primary" id="submit" name="Submit">
                </div>

                <?php if ($result): ?>
                    <div class="alert alert-success" role="alert">
                        <p><?php echo ("The final answer  is: {$_POST['Number1']} {$_POST['Operator']} {$_POST['Number2']}  =  {$totalSum} ") ?></p>
                    </div>
                <?php endif; ?>

                <?php if (isset($_POST['Submit']) && $totalSum == 0): ?>
                <div class="alert alert-warning" role="alert">
                    <p><?php echo $alert ?></p>
                </div>
                <?php endif; ?>
            </form>
        </div>
    </div>




</div>

</body>

</html>

