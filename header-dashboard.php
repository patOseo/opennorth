<?php
/**
 * The header for our theme
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$bootstrap_version = get_theme_mod( 'understrap_bootstrap_version', 'bootstrap4' );
$navbar_type       = get_theme_mod( 'understrap_navbar_type', 'collapse' );
?>
<!DOCTYPE html>
<html class="mt-0" <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?> <?php understrap_body_attributes(); ?>>
<?php do_action( 'wp_body_open' ); ?>
<div class="site" id="page">
	<!-- ******************* The Navbar Area ******************* -->
	<div class="row">
        <header class="col-sm-2 bg-deepblue vh-100 p-5 d-flex flex-column text-center position-fixed">
            <a class="navbar-brand m-0 p-0" rel="home" href="<?php echo esc_url( home_url( '/' ) ); ?>" itemprop="url">
		    	<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo-en-white.svg" alt="Open North" width="304" height="50">
		    </a>
            <div class="mt-auto">
                <a class="btn btn-light text-primary lh-1 mb-4" href="/wp-admin/" target="_blank"><span class="dashicons dashicons-wordpress-alt"></span> Go to WP Dashboard</a>
				<a class="d-block text-white lh-1 fs-6 ff-inconsolata text-decoration-none" href="<?php echo wp_logout_url(get_permalink()); ?>"><span class="dashicons dashicons-exit"></span> Log Out</a>
			</div>

        </header>

        <div class="col-sm-10 offset-2 px-md-6">
