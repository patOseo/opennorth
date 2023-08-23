<?php 
if ($query->have_posts()):
    while ($query->have_posts()): $query->the_post();
    $rtype = get_the_terms(get_the_ID(), 'resource_type');
    $projects = apply_filters('wpml_object_id', 98, 'resource_type', false);
?>
<div class="row resource-row mx-0 align-items-center border-bottom <?php if($query->current_post === 0) { echo 'border-top'; } ?> py-5">
    <div class="col-lg-9 ps-0">
        <h2 class="mb-4 mb-lg-0 fw-normal"><a class="text-decoration-none link-light" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
    </div>
    <div class="col-lg-3 pe-0">
        <div class="resource-meta text-end">
            <?php $proj_found = false; foreach($rtype as $type) { if($type->term_id == $projects) { $proj_found = true; break; } } 
            if(!$proj_found): ?>
            <div class="resource-date ff-inconsolata d-inline-block mx-3">
                <p class="mb-0 lh-1 fs-6"><?php echo get_the_date('d M Y'); ?></p>
            </div>
            <?php endif; ?>
            <div class="resource-cat text-end d-inline-block">
                <button class="d-inline btn pe-none text-white text-uppercase bg-primary border-0 py-1 w-100 text-center">
                    <?php echo $rtype[0]->name; ?>
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
            'base' => '/resources/%_%#filteredResources',
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