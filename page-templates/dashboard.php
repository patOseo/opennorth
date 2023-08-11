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

<?php if(role_any()): ?>
    <div class="wrapper" id="page-wrapper">

    	<div class="container-fluid" id="content" tabindex="-1">

    		<main class="site-main" id="main">

    			<?php get_template_part('dashboard-templates/dashboard', 'main'); ?>

    		</main>

    	</div><!-- #content -->

    </div><!-- #page-wrapper -->

    </div><!-- div.col-10 -->

<?php else: get_template_part('global-templates/must-be-logged-in'); endif; ?>

<?php
get_footer('dashboard');
