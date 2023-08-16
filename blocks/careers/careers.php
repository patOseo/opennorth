<?php 

// Create $args and retrieve careers
$args = array(
    'post_type' => 'jobs',
    'posts_per_page' => -1,
);

$careers = new WP_Query($args);

?>

<?php if($careers->have_posts()): ?>
<div class="careers-list mb-5">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
        <?php while($careers->have_posts()): $careers->the_post(); ?>
            <div class="col mb-4 scale-up" uk-scrollspy="cls: uk-animation-slide-bottom-medium; delay: 200">
                <div class="job-single d-flex flex-column p-5 h-100 rounded-3 bg-white border-offset position-relative">
                    <h3 class="mb-5"><a class="stretched-link text-primary text-decoration-none" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                    <div class="mt-auto">
                        <button class="btn btn-primary">
                            <?php if(lang_en()) { echo 'Learn more'; } elseif(lang_fr()) { echo 'En savoir plus'; } ?>
                        </button>
                    </div>
                </div>
            </div>
        <?php endwhile; ?>
    </div>
</div>
<?php endif;