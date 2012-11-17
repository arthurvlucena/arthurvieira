<?php include '/lib/Includes.php'; ?>
<!DOCTYPE html>
<html>
<head>
	<?php include '/templates/header.php'; ?>
</head>
<body>
	<div id="wrapper">
		<div id="navegation">
			<ul>
				<li><a class="link" href="<?php echo getBaseURL(); ?>home/">Home</a></li>
				<li><a class="link" href="<?php echo getBaseURL(); ?>bio/">Bio</a></li>		
			</ul>
		</div>
		<div id="loader">
			<?php 
				if (isset($_GET['page'])) {
					include '/pages/'.$_GET['page'].'.php';
				} else {
					include '/pages/home.php';
				}
			?>
		</div>
	</div>
	<script src="<?php echo getBaseURL(); ?>js/modernizr.js"></script>
	<script src="http://code.jquery.com/jquery-latest.min.js"></script>
	<script src="<?php echo getBaseURL(); ?>js/script.js"></script>
</body>
</html>
<!-- 
inspiração:
http://www.amazeelabs.com/en
http://luciasoto.es/
http://lab.4muladesign.com/dribbble/
http://www.4muladesign.com/

ler:
http://tableless.com.br/mobile-first-a-arte-de-pensar-com-foco/
 -->