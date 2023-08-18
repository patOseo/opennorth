<?php 
if(lang_en()) {
    $all = 'All';
} elseif(lang_fr()) {
    $all = 'Tous';
}
?>

<div class="filter-buttons ff-inconsolata py-4" id="filterResources">
    <div class="row">
        <div class="col-lg-8">
            <p class="text-uppercase fw-bold">
                <?php if(lang_en()) { echo 'Filter by subject'; } elseif(lang_fr()) { echo 'Filtrer par sujet'; } ?>
            </p>
            <?php
                $resource_cats = get_terms( array(
                    'taxonomy' => 'category',
                    'parent' => 0
                ) );
                
                if($resource_cats):
                    echo '<div class="filter-list-box mb-4 mb-lg-6 pe-2 pe-sm-0"><div class="row row-cols-1 row-cols-sm-2">';
                    echo '<div class="col mb-1 mb-sm-0"><input type="checkbox" name="subject" value="all" id="subjectAll" class="filterAll" checked><label for="subjectAll" class="btn text-white bg-gradient-blue border-0 py-1 w-100 text-start">' . $all . '</label></div>';
                    foreach($resource_cats as $resource_cat): if($resource_cat->name == 'Uncategorized' || $resource_cat->name == 'Non classifié(e)') { continue; }
                    echo '<div class="col mb-1 mb-sm-0"><input id="subject-' . esc_attr($resource_cat->slug) . '" type="checkbox" name="subject" value="' . esc_attr($resource_cat->slug) . '" class="subcheck"><label for="subject-' . esc_attr($resource_cat->slug) . '" class="btn text-white bg-gradient-blue border-0 py-1 w-100 text-start">' . $resource_cat->name . '</label></div>';
                    endforeach;
                    echo '</div></div>';
                endif;
            ?>
        </div>
        <div class="col-lg-4">
            <p class="text-uppercase fw-bold">
                <?php if(lang_en()) { echo 'Filter by type'; } elseif(lang_fr()) { echo 'Filtrer par type'; } ?>
            </p>
            <?php
                $resource_types = get_terms( array(
                    'taxonomy' => 'resource_type',
                    'parent' => 0
                ) );
                
                if($resource_types):
                    echo '<div class="filter-list-box mb-4 mb-lg-6 pe-2 pe-sm-0"><div class="row row-cols-1 mb-6">';
                    echo '<div class="col mb-1 mb-sm-0"><input type="checkbox" name="rtype" value="all" id="rtypeAll" class="filterAll" checked><label for="rtypeAll" class="btn text-white bg-gradient-blue border-0 py-1 w-100 text-start">' . $all . '</label></div>';
                    foreach($resource_types as $resource_type):
                        echo '<div class="col mb-1 mb-sm-0"><input id="type-' . esc_attr($resource_type->slug) . '" type="checkbox" name="rtype" value="' . esc_attr($resource_type->slug) . '" class="subcheck"><label for="type-' . esc_attr($resource_type->slug) . '" class="btn text-white bg-gradient-blue border-0 py-1 w-100 text-start">' . $resource_type->name . '</label></div>';
                    endforeach;
                    echo '</div></div>';
                endif;
            ?>
        </div>
    </div>
    <div class="resources-search mb-5">
        <div class="row justify-content-end align-items-center">
            <div class="col-lg-4 px-0 text-end">
                <div>
                    <label for="resourceSearch" class="d-inline mt-3 mb-0 me-2 fw-bold">
                    <?php if(lang_en()) { echo 'Search'; } elseif(lang_fr()) { echo 'Rechercher'; } ?>
                    </label>
                    <input id="resourceSearch" type="text" class="p-1 no-focus text-white d-inline bg-deepblue rounded-0 border-2 border-top-0 border-start-0 border-end-0 border-bottom" aria-label="Search resources" aria-describedby="buttonSearch">
                    <img id="buttonSearch" class="mx-2" src="<?php echo get_stylesheet_directory_uri() . '/images/icon-search-w.svg'; ?>" width="32" height="32">
                </div>
            </div>
        </div>
    </div>
    <div class="resources-sort">
        <div class="row">
            <div class="col-lg-4 px-0">
                <button id="sortResources" value="DESC" class="px-0 btn btn-lg btn-primary bg-transparent d-inline mt-3 mb-0 me-2 fw-bold border-0">
                    <span><?php if(lang_en()) { echo 'Newest first'; } elseif(lang_fr()) { echo 'Les plus récents en premier'; } ?></span>  <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/icon-arrow.svg" alt="Arrow" class="transition-1s">
                </button>
            </div>
        </div>
    </div>
</div>