<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

?>

<?php if(is_single()): // Add the topTopButton if it's a Resources page ?>
	<button id="toTopButton" class="hidden btn btn-primary p-2 rounded-2" aria-label="Scroll to Top" role="button" tabindex="0"><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-arrow.svg" width="18" alt="Back to Top"></button>
<?php endif; ?>
<div class="wrapper footer-wrapper py-5" id="wrapper-footer">

	<div class="container">

		<footer class="site-footer text-white py-3" id="colophon">

			<div class="row" uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 120; repeat: true">

				<div class="col-12 col-lg-6">

					<img class="mb-5" src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo-full-white.svg" alt="Open North | Nord Ouvert" width="480" height="44">
					<div class="mb-5 w-75">
						<h3 class="h4 mb-4"><?php if(lang_en()) { echo 'About us'; } elseif(lang_fr()) { echo 'À propos de Nord Ouvert'; } ?></h3>
						<p class="fs-6"><?php the_field('footer_about', 'option'); ?></p>
					</div>
					<div class="footer-social mb-5 mb-lg-0">
						<a class="text-decoration-none" href="https://www.linkedin.com/company/open-north/" target="_blank" rel="noopener,noreferrer">
							<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-linkedin.svg" alt="Open North on LinkedIn" width="36" height="36">
						</a>
						<a class="ms-4 text-decoration-none" href="https://twitter.com/opennorth" target="_blank" rel="noopener,noreferrer">
							<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-twitter.svg" alt="Open North on Twitter">
						</a>
					</div>
				</div>

				<div class="col-6 col-lg-3">
					<h3 class="h4 mb-4">
						<?php if(lang_en()) { echo 'Quick Links'; } elseif(lang_fr()) { echo 'Liens rapides'; } ?>
					</h3>
					<?php
					wp_nav_menu(
						array(
							'container_class' => 'footer-menu-container',
							'menu'			  => 55,
							'menu_class'      => 'p-0 fs-6',
							'fallback_cb'     => '',
							'menu_id'         => 'footer-menu',
							'depth'           => 2,
							'walker'          => new Understrap_WP_Bootstrap_Navwalker(),
						)
					);
					?>
					<!-- <ul class="navbar-nav flex-grow-1">
						<li class="menu-item"><a class="d-inline-block nav-link py-1 text-decoration-underline" href="#">Our Work</a></li>
						<li class="menu-item"><a class="d-inline-block nav-link py-1 text-decoration-underline" href="#">Resources</a></li>
						<li class="menu-item"><a class="d-inline-block nav-link py-1 text-decoration-underline" href="#">Courses</a></li>
						<li class="menu-item"><a class="d-inline-block nav-link py-1 text-decoration-underline" href="#">Careers</a></li>
					</ul> -->
				</div>
				<div class="col-6 col-lg-3">
					<h3 class="h4 mb-4">
						<?php if(lang_en()) { echo 'Contact us'; } elseif(lang_fr()) { echo 'Contactez-nous'; } ?>
					</h3>
					<p class="fs-6">4388 Rue Saint-Denis<br>
					Suite 200, #216<br>
					Montréal, QC, Canada H2J 2L1<br>
					<a class="text-white" href="tel:1-888-750-4980">1-888-750-4980</a><br>
					<a class="text-white" href="mailto:info@opennorth.ca">info@opennorth.ca</a>
					</p>
					<p class="fs-6">
					<strong>Privacy officer:</strong><br>
					Merlin Chatwin<br>
					Executive Director<br>
					<a class="text-white" href="mailto:info@opennorth.ca">info@opennorth.ca</a>
					</p>
				</div>

			</div><!-- .row -->

		</footer><!-- #colophon -->

	</div><!-- .container -->

</div><!-- #wrapper-footer -->

<?php // Closing div#page from header.php. ?>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>

</html>

