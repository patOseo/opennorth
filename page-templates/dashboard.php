<?php
/**
 * Template Name: Dashboard Page
 *
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header('dashboard');

$container = get_theme_mod( 'understrap_container_type' );

?>

    <div class="wrapper" id="page-wrapper">

    	<div class="container-fluid" id="content" tabindex="-1">

    		<main class="site-main" id="main">

    			<?php
    			while ( have_posts() ) {
    				the_post();
    				get_template_part( 'loop-templates/content', 'page' );
    			}
    			?>

    		</main>

    	</div><!-- #content -->

    </div><!-- #page-wrapper -->

    </div><!-- div.col-10 -->

<?php
get_footer('dashboard');
