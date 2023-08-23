<?php
/**
 * The template for displaying search results pages
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

$container = get_theme_mod( 'understrap_container_type' );

?> 

<div class="wrapper" id="search-wrapper">

	<div class="container" id="content" tabindex="-1">

		<div class="row">

			<main class="site-main px-4 px-lg-6" id="main" uk-scrollspy="target: .resource-row; cls: uk-animation-slide-bottom-small; delay: 200">

				<?php if ( have_posts() ) : ?>

					<header class="page-header my-6">

							<h1 class="page-title">
								<?php
								if(lang_en()) {
									$results_txt = 'Search Results for: ';
								} elseif(lang_fr()) {
									$results_txt = 'Résultats de recherche pour : ';
								}
								printf(
									/* translators: %s: query term */
									esc_html__( $results_txt . '%s', 'understrap' ),
									'<span>' . get_search_query() . '</span>'
								);
								?>
							</h1>

					</header><!-- .page-header -->

					<?php /* Start the Loop */ ?>
					<?php
					while ( have_posts() ) :
						the_post();

						/*
						 * Run the loop for the search to output the results.
						 * If you want to overload this in a child theme then include a file
						 * called content-search.php and that will be used instead.
						 */
						get_template_part( 'loop-templates/content', 'search-list' );
					endwhile;
					?>

				<?php else : ?>

					<?php get_template_part( 'loop-templates/content', 'none' ); ?>

				<?php endif; ?>

			</main>

			<?php
			// Display the pagination component.
			understrap_pagination();
			?>

		</div><!-- .row -->

	</div><!-- #content -->

</div><!-- #search-wrapper -->

<?php
get_footer();
