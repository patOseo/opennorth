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
	<button id="toTopButton" class="hidden btn btn-primary p-3 rounded-circle" aria-label="Scroll to Top" role="button" tabindex="0"><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-arrow.svg" width="16" alt="Back to Top"></button>
<?php endif; ?>

<div class="wrapper footer-wrapper py-5" id="wrapper-footer">

	<div class="container">

		<footer class="site-footer text-white py-3" id="colophon">

			<div class="row" uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 120; repeat: true">

				<div class="col-12 col-lg-6">

					<img class="mb-5" src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo-full-white.svg" alt="Open North | Nord Ouvert" width="480" height="44">
					<div class="mb-5 w-75">
						<h3 class="h4 mb-4"><?php if(lang_en()) { echo 'About us'; } elseif(lang_fr()) { echo 'À propos de Nord Ouvert'; } ?></h3>
						<p class="fs-6"><?php echo get_field('footer_about', 'option'); ?></p>
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
				</div>
				<div class="col-6 col-lg-3">
					<h3 class="h4 mb-4">
						<?php if(lang_en()) { echo 'Contact us'; } elseif(lang_fr()) { echo 'Contactez-nous'; } ?>
					</h3>
					<?php echo get_field('footer_contact_info', 'option'); ?>
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

