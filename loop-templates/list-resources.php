<?php 
if ($query->have_posts()):
    while ($query->have_posts()): $query->the_post();
?>
<div class="row resource-row align-items-center border-bottom <?php if(get_row_index() == 1) { echo 'border-top'; } ?> py-5">
    <div class="col-lg-9">
        <h2 class="mb-4 mb-lg-0 fw-normal"><a class="text-decoration-none link-light" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
    </div>
    <div class="col-lg-3">
        <div class="resource-meta text-end">
            <div class="resource-date ff-inconsolata d-inline-block mx-3">
                <p class="mb-0 lh-1 fs-6"><?php echo get_the_date('d M Y'); ?></p>
            </div>
            <div class="resource-cat text-end d-inline-block">
                <button class="d-inline btn pe-none text-white text-uppercase bg-primary border-0 py-1 w-100 text-center">
                    <?php $rtype = get_the_terms(get_the_ID(), 'resource_type'); echo $rtype[0]->name; ?>
                </button>
            </div>
        </div>
    </div>
</div>
<?php endwhile; ?>

<div class="mt-4">
    <?php 
    understrap_pagination( [
            'total' => $query->max_num_pages,
            'prev_text' => '&#60;',
            'next_text' => '&#62;',
        ], 'pagination ff-inconsolata fw-bold' ); 
    ?>
</div>

<?php else: 

    // Display a message if no posts found
    if(lang_en()) {
        $msg = 'No resources found. Try selecting different filtering options.';
    } elseif(lang_fr()) {
        $msg = 'Aucune ressource trouvée. Essayez de sélectionner différentes options de filtrage.';
    }
    // Display a message if no posts found
    echo '<div class="row resource-row"><div class="col fs-3">' . $msg . '</div></div>';

endif;