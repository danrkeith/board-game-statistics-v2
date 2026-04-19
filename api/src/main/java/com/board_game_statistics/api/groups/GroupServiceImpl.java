package com.board_game_statistics.api.groups;

import com.board_game_statistics.api.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;

    public GroupServiceImpl(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @Override
    public List<Group> getGroups() {
        return groupRepository.findAllByOrderById();
    }

    @Override
    public Group getGroup(long id) {
        return groupRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Group does not exist"));
    }

    @Override
    public Group createGroup(String name) {
        Group group = new Group().setName(name);

        return groupRepository.save(group);
    }
}
