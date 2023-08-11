<?php 
	if(isset($_GET['login'])) {
		$failed = $_GET['login'];
	} else {
		$failed = 'no';
	}
?>

<div class="wrapper h-100" id="index-wrapper">

	<div class="container h-100" id="content" tabindex="-1">


		

		<div class="row vh-100 align-items-center justify-content-center">
					<div class="col-sm-5">

						<h2 class="h3 text-center my-4">You must be logged in to view this page.</h2>
                        <?php 
		                // If login failed, display this message.
		                if($failed == 'failed'): ?>
		                	<h5 class="text-center my-4 alert alert-secondary">Log in failed, invalid credentials. Please try again.</h5>
		                <?php endif; ?>
						<div class="position-relative rounded-3 p-6 h-100 mx-3 border-offset bg-white login-form mb-6">
							<?php wp_login_form(array('redirect' => get_permalink())); ?>
							<p><a href="/wp-login.php?action=lostpassword">Forgot Password?</a></p>
						</div>

						<div class="text-center">
							<h6>Don't have an account? Contact an Open North administrator.</h6>
						</div>
						
					</div>

		</div><!-- .row -->

	</div><!-- #content -->

</div><!-- #index-wrapper -->