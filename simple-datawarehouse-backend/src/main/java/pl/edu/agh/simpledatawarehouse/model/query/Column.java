package pl.edu.agh.simpledatawarehouse.model.query;

public record Column(
        String name,
        String alias,
        String function
) {
}
