<?php 
    $url = get_field('course_url', get_the_ID());
    $desc = get_field('course_desc', get_the_ID());
    $area = get_field('area', get_the_ID());
    $cid = get_field('course_id', get_the_ID());
?>

<div class="course-single d-flex flex-column rounded-3 bg-lightgrey position-relative p-5 h-100 scale-up">
    <hr class="divider divider-gradient-blue rounded mt-0 mb-4">
    <h2 class="lh-md word-break"><a class="stretched-link text-deepblue text-decoration-none" href="<?php echo esc_url($url); ?>" target="_blank" rel="noopener noreferrer"><?php the_title(); ?></a></h2>
    <p class="text-deepblue fs-6"><?php echo $desc; ?></p>

    <div class="mt-auto course-meta ff-inconsolata text-deepblue fs-6">
        <p class="mb-2"><strong>Area: </strong> <?php echo get_term($area)->name; ?></p>
        <p class="fw-bold">[<?php echo $cid; ?>]</p>
        <button class="btn btn-primary ff-inconsolata py-2 px-3">View course <img src="<?php echo get_stylesheet_directory_uri() . '/images/icon-external-link.svg'; ?>" width="24" height="24"></button>
    </div>
</div>