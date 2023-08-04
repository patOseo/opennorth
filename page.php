<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

$container = get_theme_mod( 'understrap_container_type' );

?>

<div class="wrapper uk-animation-slide-bottom-small" id="page-wrapper">

	<div class="container-fluid" id="content" tabindex="-1">

		<main class="site-main" id="main">

			<?php
			while ( have_posts() ) {
				the_post();
				get_template_part( 'loop-templates/content', 'page' );
			}
			?>

		</main>

		<?php if(get_field('include_newsletter')): ?>
			<?php get_template_part('global-templates/newsletter'); ?>
		<?php endif; ?>

		<?php if(get_field('include_cta')): ?>
			<?php get_template_part('global-templates/cta-footer'); ?>
		<?php endif; ?>

	</div><!-- #content -->

</div><!-- #page-wrapper -->

<?php
get_footer();
