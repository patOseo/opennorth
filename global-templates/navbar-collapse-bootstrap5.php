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

<div class="container menu-container">
	<nav id="main-nav" class="d-flex justify-content-between navbar navbar-expand-xl navbar-light bg-white" aria-labelledby="main-nav-label">

		<p id="main-nav-label" class="screen-reader-text">
			<?php esc_html_e( 'Main Navigation', 'understrap' ); ?>
		</p>

			<a class="navbar-brand m-0 p-0" rel="home" href="<?php echo esc_url( home_url( '/' ) ); ?>" itemprop="url">
				<?php if(lang_en()): ?>
					<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo-en.svg" alt="Open North" width="304" height="50">
				<?php elseif(lang_fr()): ?>
					<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/logo-fr.svg" alt="Nord Ouvert" width="326" height="50">
				<?php endif; ?>
			</a>

			<button
				class="navbar-toggler border-0"
				id="navbarToggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="<?php esc_attr_e( 'Toggle navigation', 'understrap' ); ?>"
			>
				<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-menu.svg" width="30" height="30">
			</button>

			<div class="main-menu-container align-items-center d-xl-flex col-12 col-xl-auto">
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

				<div class="d-none d-xl-inline-block search-btn mx-3">
					<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-search.svg" alt="Search" width="32" height="32">
				</div>

				<?php get_template_part('global-templates/lang-switcher'); ?>
			</div>

	</nav><!-- #main-nav -->
</div><!-- .container(-fluid) -->