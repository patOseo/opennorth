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
				class="navbar-toggler border-0 col-auto text-end"
				id="navbarToggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="<?php esc_attr_e( 'Toggle navigation', 'understrap' ); ?>"
			>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</button>

			<div class="main-menu-container col-12 col-xl-auto">
				<div class="collapse navbar-collapse" id="navbarNavDropdown">
					<div class="row mx-0 px-0 py-4 py-xl-0 align-items-center">
						<div class="col-6 col-xl-auto order-first px-0 me-0">
							<!-- The WordPress Menu goes here -->
							<?php
							wp_nav_menu(
								array(
									'theme_location'  => 'primary',
									'container_class' => '',
									'container_id'    => '',
									'menu_class'      => 'navbar-nav ms-auto',
									'fallback_cb'     => '',
									'menu_id'         => 'main-menu',
									'depth'           => 2,
									'walker'          => new Understrap_WP_Bootstrap_Navwalker(),
								)
							);
							?>
						</div>

						<div class="col-12 col-xl-auto order-3 order-xl-2 px-0 pt-4 pt-xl-0 d-block d-xl-inline search-btn align-self-top <?php if(lang_en()) { echo 'mx-xl-6'; } elseif(lang_fr()) { echo 'mx-xl-3'; } ?>">
							<div class="row align-items-center"> 
								<div class="col-10 d-xl-none"><input class="px-3 w-100 form-control border-primary bg-white" type="text" placeholder="Search..."></div>
								<div class="col-2 col-xl-12"><img src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-search.svg" alt="Search" width="32" height="32"></div>
							</div>
						</div>
					
						<div class="col-6 col-xl-auto order-2 order-xl-3 px-0 d-block d-xl-inline align-self-start text-end text-xl-start">
							<?php get_template_part('global-templates/lang-switcher'); ?>
						</div>
					</div>
				</div>
			</div>

	</nav><!-- #main-nav -->
</div><!-- .container(-fluid) -->