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

$uid = wp_unique_id( 's-' ); // The search form specific unique ID for the input.

$aria_label = '';
if ( isset( $args['aria_label'] ) && ! empty( $args['aria_label'] ) ) {
	$aria_label = 'aria-label="' . esc_attr( $args['aria_label'] ) . '"';
}

if(lang_en()) {
	$placeholder = 'Search...';
} elseif(lang_fr()) {
	$placeholder = 'Recherche...';
}
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
								<div class="col-lg-5">
									<form role="search" class="search-form" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" <?php echo $aria_label; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped above. ?>>
										<label class="screen-reader-text" for="<?php echo $uid; ?>"><?php echo esc_html_x( 'Search for:', 'label', 'understrap' ); ?></label>
										<div class="input-group justify-content-center">
											<div class="col-10 me-xl-2"><input type="search" class="px-3 w-100 form-control border-primary bg-white rounded" id="<?php echo $uid; ?>" name="s" value="<?php the_search_query(); ?>" placeholder="<?php echo esc_attr_x( $placeholder, 'placeholder', 'understrap' ); ?>"></div>
											<div class="align-self-center position-relative"><button class="bg-transparent border-0" type="submit" name="submit"><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-search.svg" alt="Search" width="32" height="32"></button></div>
									</form>
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
