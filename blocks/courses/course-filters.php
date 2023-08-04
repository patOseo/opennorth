<div class="courses-filter filter-buttons ff-inconsolata py-4" id="filterCourses">
    <p class="text-uppercase fw-bold">
        <?php if(lang_en()) { echo 'Filter by area'; } elseif(lang_fr()) { echo 'Filtrer par matière'; } ?>
    </p>
    <?php
        $course_cats = get_terms( array(
            'taxonomy' => 'area'
        ) );
        if($course_cats):
            echo '<div class="row row-cols-1 row-cols-lg-3 mb-6">';
            echo '<div class="col"><input aria-hidden="true" type="checkbox" name="area" value="all" id="areaAll" class="filterAll" checked><label tabindex="0" for="areaAll" class="btn text-white bg-gradient-blue border-0 py-1 w-100 text-start">All</label></div>';
            foreach($course_cats as $course_cat):
                echo '<div class="col"><input aria-hidden="true" id="area-' . esc_attr($course_cat->slug) . '" type="checkbox" name="area" value="' . esc_attr($course_cat->slug) . '" class="subcheck"><label tabindex="0" for="area-' . esc_attr($course_cat->slug) . '" class="btn text-white bg-gradient-blue border-0 py-1 w-100 text-start">' . $course_cat->name . '</label></div>';
            endforeach;
            echo '</div>';
        endif;
    ?>
    <div class="courses-search mb-6">
        <div class="row justify-content-end align-items-center">
            <div class="col-lg-4 text-end">
                <div>
                    <label for="courseSearch" class="d-inline mt-3 mb-0 me-2 fw-bold">
                        <?php if(lang_en()) { echo 'Search'; } elseif(lang_fr()) { echo 'Recherche'; } ?>
                    </label>
                    <input id="courseSearch" type="text" class="p-1 no-focus text-white d-inline bg-deepblue rounded-0 border-2 border-top-0 border-start-0 border-end-0 border-bottom" aria-label="Search courses" aria-describedby="buttonSearch">
                    <label for="buttonSearch"><img id="buttonSearch" class="mx-2" src="<?php echo get_stylesheet_directory_uri() . '/images/icon-search-w.svg'; ?>" width="32" height="32"></label>
                </div>
            </div>
        </div>
    </div>
</div>