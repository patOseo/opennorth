<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

$container = get_theme_mod( 'understrap_container_type' );
?>

<div class="wrapper uk-animation-slide-bottom-small" id="error-404-wrapper">

	<div class="<?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">

		<div class="row">

			<div class="col-md-12 content-area" id="primary">

				<main class="site-main" id="main">

					<section class="error-404 not-found my-6">

						<header class="page-header text-center py-5">

							<p class="display-1 fw-light">404</p>
							<h1 class="page-title">
								<?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'understrap' ); ?>
							</h1>

						</header><!-- .page-header -->

						<div class="page-content text-center">

							<p class="mb-4"><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try a search?', 'understrap' ); ?></p>

							<div class="row justify-content-center">
								<div class="col-lg-6">
									<?php get_search_form(); ?>
								</div>
							</div>
							
						</div><!-- .page-content -->

					</section><!-- .error-404 -->

				</main>

			</div><!-- #primary -->

		</div><!-- .row -->

	</div><!-- #content -->

	<?php get_template_part('global-templates/newsletter'); ?>
	<?php get_template_part('global-templates/cta-footer'); ?>

</div><!-- #error-404-wrapper -->

<?php
get_footer();
