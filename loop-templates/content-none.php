<?php
/**
 * The template part for displaying a message that posts cannot be found
 *
 * Learn more: https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if(lang_en()) {
	$no_results_txt = 'Nothing Found';
	$no_results_desc = 'Sorry, but nothing matched your search terms. Please try again with some different keywords.';
} elseif(lang_fr()) {
	$no_results_txt = 'Aucun résultat';
	$no_results_desc = 'Désolé, mais rien ne correspond à vos termes de recherche. Veuillez réessayer avec des mots-clés différents.';
}
?>

<section class="no-results not-found my-6" class="uk-animation-slide-bottom-medium">

	<header class="page-header">

		<h1 class="page-title"><?php esc_html_e( $no_results_txt, 'understrap' ); ?></h1>

	</header><!-- .page-header -->

	<div class="page-content">

		<?php
		if ( is_home() && current_user_can( 'publish_posts' ) ) :

			$kses = array( 'a' => array( 'href' => array() ) );
			printf(
				/* translators: 1: Link to WP admin new post page. */
				'<p>' . wp_kses( __( 'Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'understrap' ), $kses ) . '</p>',
				esc_url( admin_url( 'post-new.php' ) )
			);

		elseif ( is_search() ) :

			printf(
				'<p>%s<p>',
				esc_html__( $no_results_desc, 'understrap' )
			);
			get_search_form();

		else :

			printf(
				'<p>%s<p>',
				esc_html__( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'understrap' )
			);
			get_search_form();

		endif;
		?>
	</div><!-- .page-content -->

</section><!-- .no-results -->
