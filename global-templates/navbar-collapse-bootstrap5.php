<?php
/**
 * Header Navbar (bootstrap5)
 *
 * @package Understrap
 * @since 1.1.0
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

?>

<div class="container px-lg-0">
	<nav id="main-nav" class="d-flex justify-content-between navbar navbar-expand-xl navbar-light bg-white mt-4" aria-labelledby="main-nav-label">

		<h2 id="main-nav-label" class="screen-reader-text">
			<?php esc_html_e( 'Main Navigation', 'understrap' ); ?>
		</h2>

			<a class="navbar-brand m-0 p-0" rel="home" href="<?php echo esc_url( home_url( '/' ) ); ?>" itemprop="url">
				<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo-en.svg" alt="Open North" width="304" height="50">
			</a>

			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="<?php esc_attr_e( 'Toggle navigation', 'understrap' ); ?>"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="main-menu-container d-flex align-items-center">
				<!-- The WordPress Menu goes here -->
				<?php
				wp_nav_menu(
					array(
						'theme_location'  => 'primary',
						'container_class' => 'collapse navbar-collapse',
						'container_id'    => 'navbarNavDropdown',
						'menu_class'      => 'navbar-nav ms-auto',
						'fallback_cb'     => '',
						'menu_id'         => 'main-menu',
						'depth'           => 2,
						'walker'          => new Understrap_WP_Bootstrap_Navwalker(),
					)
				);
				?>

				<div class="d-inline-block search-btn mx-5">
					<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-search.svg" alt="Search" width="32" height="32">
				</div>

				<div class="lang-selector d-inline-block ms-4">
					<div class="d-inline-block lang-btn lang-btn-en active">EN</div>
					<div class="d-inline-block lang-btn lang-btn-fr">FR</div>
				</div>
			</div>

	</nav><!-- #main-nav -->
</div><!-- .container(-fluid) -->