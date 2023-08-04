<?php
/**
 * The template for displaying all single posts
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();
$container = get_theme_mod( 'understrap_container_type' );
?>

<div class="wrapper uk-animation-slide-bottom-small" id="single-wrapper">

	<div class="<?php echo esc_attr( $container ); ?> px-lg-5" id="content" tabindex="-1">

			<main class="site-main" id="main">

				<?php
				while ( have_posts() ) {
					the_post();
					get_template_part( 'loop-templates/content', 'single' );
				}
				?>

			</main>

			<?php get_template_part('global-templates/newsletter'); ?>

			<?php get_template_part('global-templates/cta-footer'); ?>

	</div><!-- #content -->

</div><!-- #single-wrapper -->

<?php
get_footer();
